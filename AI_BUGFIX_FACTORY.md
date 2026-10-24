# AI bug-fix workflow

SARH can turn a maintainer-reviewed bug report into a candidate pull request. A maintainer comments `/ai-fix` on the issue; Codex proposes a focused patch; a separate clean job applies it and runs the configured checks; only a passing patch is opened as a pull request. The workflow does not merge or deploy.

## Activate it for SARH

1. Add an OpenAI API key as a repository Actions secret named `OPENAI_API_KEY` in **Settings → Secrets and variables → Actions**.
2. Merge the files under `.github/workflows/` and `.github/codex/prompts/` into the repository's default branch, with GitHub Actions enabled.
3. Open or select a bug issue, review it, then comment exactly `/ai-fix` as the repository owner, a member, or a collaborator.
4. If the proposed change passes `npm run build` and `npm run test:e2e`, the workflow opens a pull request and links it back to the issue. Review the diff and workflow run before merging.

The workflow intentionally accepts only the exact command from trusted repository participants. Issue contents are treated as untrusted input. Codex uses a custom profile extending `:workspace` with command network access disabled; it cannot write GitHub runner command files, Git config, or hooks, and runs with `drop-sudo`. Its job has read-only GitHub permissions and no persisted checkout credentials. The OpenAI key is passed only to the Codex action. Candidate code is tested separately without write permission or repository secrets. A scope check rejects patches outside `src/`, `tests/`, `public/`, and root-level Markdown files. The final PR job only applies the already-validated patch and opens the PR; it does not execute the candidate code.

The workflow creates PRs with GitHub's built-in token. GitHub does not start other workflows for events caused by that token, so this factory runs the configured build and E2E checks itself before opening a PR. If SARH later requires additional PR-triggered checks, use a suitably restricted GitHub App token and review the implications before replacing the built-in token.

## Reuse it for Darsli

The reusable implementation is `.github/workflows/ai-bugfix-reusable.yml`. Once this change is merged, Darsli can either copy that workflow and `.github/codex/prompts/issue-fix.md`, or call the reusable workflow from its own `issue_comment` workflow. For a cross-repository call, pin the `uses:` reference to a reviewed full commit SHA rather than a moving branch, and ensure SARH's repository visibility/access settings allow Darsli to use the workflow.

Example Darsli caller (adapt permissions and commands to the repository):

```yaml
name: AI bug-fix request
on:
  issue_comment:
    types: [created]
permissions:
  contents: write
  issues: write
  pull-requests: write
jobs:
  ai-bugfix:
    if: >-
      github.event.issue.pull_request == null &&
      github.event.comment.body == '/ai-fix' &&
      contains(fromJSON('["OWNER","MEMBER","COLLABORATOR"]'), github.event.comment.author_association)
    uses: dia2lk/sarh/.github/workflows/ai-bugfix-reusable.yml@<reviewed-commit-sha>
    permissions:
      contents: write
      issues: write
      pull-requests: write
    with:
      setup-command: |
        npm ci
      validation-command: |
        npm run typecheck
        npm run build
        npm test
    secrets:
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

Keep the validation commands in the trusted caller workflow—not in the issue text. If Darsli uses a different package manager or test stack, change only those commands and confirm the patch paths allowed by the reusable workflow match the files Darsli should let the agent edit.
