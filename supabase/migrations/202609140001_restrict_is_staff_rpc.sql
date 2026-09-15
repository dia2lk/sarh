-- `authenticated` inherits from the Supabase `anon` role in this project.
-- Revoke it explicitly so the staff-check RPC cannot be called before sign-in.
revoke execute on function public.is_staff() from anon;
grant execute on function public.is_staff() to authenticated;
