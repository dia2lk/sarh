import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign, CheckCircle2, Clock, AlertTriangle,
  Search, Eye, Send, ArrowUpDown,
  Receipt, Plus, Copy, ExternalLink
} from 'lucide-react';

// ---- Types ----
interface Invoice {
  id: string;
  lead_id: string;
  lead_name: string;
  lead_phone: string;
  service_type: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'refunded' | 'disputed';
  stripe_session_id?: string;
  checkout_url?: string;
  description: string;
  created_at: string;
  paid_at?: string;
  due_date: string;
}

type SortField = 'lead_name' | 'amount' | 'status' | 'created_at';
type SortDir = 'asc' | 'desc';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: 'قيد الانتظار', color: 'text-amber-700', bg: 'bg-amber-100', icon: Clock },
  paid: { label: 'مدفوعة', color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle2 },
  overdue: { label: 'متأخرة', color: 'text-red-700', bg: 'bg-red-100', icon: AlertTriangle },
  refunded: { label: 'مستردة', color: 'text-purple-700', bg: 'bg-purple-100', icon: Receipt },
  disputed: { label: 'نزاع', color: 'text-orange-700', bg: 'bg-orange-100', icon: AlertTriangle },
};

const SERVICE_LABELS: Record<string, string> = {
  corporate: 'تأسيس الشركات',
  contracts: 'العقود الاستراتيجية',
  tax: 'الاستشارات الضريبية',
  criminal: 'القضايا المعقدة',
  consultation: 'استشارة عامة',
  other: 'أخرى',
};

// ---- Demo Data ----
const DEMO_INVOICES: Invoice[] = [
  {
    id: 'INV-001', lead_id: '1', lead_name: 'أحمد محمد العمري', lead_phone: '01098765432',
    service_type: 'corporate', amount: 15000, currency: 'EGP', status: 'paid',
    stripe_session_id: 'cs_test_abc123', description: 'تأسيس شركة مساهمة',
    created_at: '2025-01-15T10:00:00Z', paid_at: '2025-01-16T14:30:00Z', due_date: '2025-01-30',
  },
  {
    id: 'INV-002', lead_id: '2', lead_name: 'سارة عبدالله المنصور', lead_phone: '01123456789',
    service_type: 'contracts', amount: 8500, currency: 'EGP', status: 'pending',
    checkout_url: 'https://checkout.stripe.test/xyz', description: 'مراجعة عقد شراكة دولي',
    created_at: '2025-01-18T09:00:00Z', due_date: '2025-02-01',
  },
  {
    id: 'INV-003', lead_id: '3', lead_name: 'محمود حسن الخالد', lead_phone: '01055556666',
    service_type: 'tax', amount: 12000, currency: 'EGP', status: 'overdue',
    description: 'هيكلة ضريبية شاملة', created_at: '2025-01-05T08:00:00Z', due_date: '2025-01-20',
  },
  {
    id: 'INV-004', lead_id: '4', lead_name: 'فاطمة علي الزهراء', lead_phone: '01233334444',
    service_type: 'criminal', amount: 25000, currency: 'EGP', status: 'paid',
    stripe_session_id: 'cs_test_def456', description: 'تمثيل قانوني - قضية اقتصادية',
    created_at: '2025-01-10T11:00:00Z', paid_at: '2025-01-12T09:00:00Z', due_date: '2025-01-25',
  },
  {
    id: 'INV-005', lead_id: '5', lead_name: 'خالد إبراهيم السيد', lead_phone: '01112223333',
    service_type: 'consultation', amount: 3000, currency: 'EGP', status: 'refunded',
    description: 'استشارة قانونية - إيجار تجاري',
    created_at: '2025-01-08T15:00:00Z', paid_at: '2025-01-09T10:00:00Z', due_date: '2025-01-22',
  },
  {
    id: 'INV-006', lead_id: '6', lead_name: 'نور الدين أحمد', lead_phone: '01099887766',
    service_type: 'corporate', amount: 35000, currency: 'EGP', status: 'pending',
    checkout_url: 'https://checkout.stripe.test/abc', description: 'إعادة هيكلة شركة قابضة',
    created_at: '2025-01-20T13:00:00Z', due_date: '2025-02-05',
  },
  {
    id: 'INV-007', lead_id: '7', lead_name: 'ريم محمد صلاح', lead_phone: '01554443322',
    service_type: 'contracts', amount: 5000, currency: 'EGP', status: 'disputed',
    description: 'صياغة عقد وكالة تجارية', created_at: '2025-01-12T16:00:00Z', due_date: '2025-01-27',
  },
];

export default function BillingDashboard() {
  const [invoices] = useState<Invoice[]>(DEMO_INVOICES);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  // ---- Stats ----
  const stats = useMemo(() => {
    const total = invoices.reduce((s, i) => s + i.amount, 0);
    const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
    const pending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
    const overdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
    return {
      total, paid, pending, overdue,
      paidCount: invoices.filter(i => i.status === 'paid').length,
      pendingCount: invoices.filter(i => i.status === 'pending').length,
      overdueCount: invoices.filter(i => i.status === 'overdue').length,
      totalInvoices: invoices.length,
    };
  }, [invoices]);

  // ---- Filter + Sort ----
  const filtered = useMemo(() => {
    let data = [...invoices];
    if (statusFilter !== 'all') data = data.filter(i => i.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(i =>
        i.lead_name.includes(q) || i.lead_phone.includes(q) ||
        i.description.includes(q) || i.id.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'amount') cmp = a.amount - b.amount;
      else if (sortField === 'created_at') cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortField === 'lead_name') cmp = a.lead_name.localeCompare(b.lead_name, 'ar');
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return data;
  }, [invoices, search, statusFilter, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatAmount = (a: number) => a.toLocaleString('ar-EG');

  return (
    <>
      {/* Header */}
      <section className="bg-[#0f172a] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c29a56 0%, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="text-[#c29a56] font-bold text-sm tracking-wider block mb-2">نظام الفوترة والتحصيل</span>
              <h1 className="text-3xl md:text-4xl font-black text-white">لوحة <span className="text-[#c29a56]">الفواتير</span></h1>
              <p className="text-gray-400 mt-2">إدارة الفواتير والمدفوعات عبر Stripe</p>
            </div>
            <div className="flex gap-3">
              <Link to="/crm" className="bg-white/10 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white/20 transition-colors text-sm">لوحة العملاء</Link>
              <button onClick={() => setShowCreateModal(true)} className="bg-[#c29a56] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#a88340] transition-colors flex items-center gap-2 text-sm">
                <Plus size={18} /> فاتورة جديدة
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'إجمالي الإيرادات', value: formatAmount(stats.total), unit: 'ج.م', icon: DollarSign, color: 'text-[#0f172a]' },
              { label: 'مدفوعة', value: formatAmount(stats.paid), unit: 'ج.م', icon: CheckCircle2, color: 'text-green-600', count: stats.paidCount },
              { label: 'قيد الانتظار', value: formatAmount(stats.pending), unit: 'ج.م', icon: Clock, color: 'text-amber-600', count: stats.pendingCount },
              { label: 'متأخرة', value: formatAmount(stats.overdue), unit: 'ج.م', icon: AlertTriangle, color: 'text-red-600', count: stats.overdueCount },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <s.icon size={20} className={s.color} />
                  {s.count !== undefined && <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-bold">{s.count}</span>}
                </div>
                <p className={`text-xl md:text-2xl font-black ${s.color}`}>{s.value} <span className="text-sm font-normal text-gray-400">{s.unit}</span></p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="بحث بالاسم أو الهاتف أو رقم الفاتورة..." className="w-full pr-11 pl-4 py-2.5 border border-gray-200 rounded-xl text-right text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'paid', 'overdue', 'refunded', 'disputed'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    statusFilter === s ? 'bg-[#0f172a] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}>
                  {s === 'all' ? `الكل (${invoices.length})` : `${STATUS_CONFIG[s].label} (${invoices.filter(i => i.status === s).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="py-8 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Receipt size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">لا توجد فواتير مطابقة</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      {[
                        { field: 'id' as SortField, label: 'رقم الفاتورة' },
                        { field: 'lead_name' as SortField, label: 'العميل' },
                        { field: 'amount' as SortField, label: 'المبلغ' },
                        { field: 'status' as SortField, label: 'الحالة' },
                        { field: 'created_at' as SortField, label: 'التاريخ' },
                      ].map(h => (
                        <th key={h.field} className="px-5 py-4 text-right font-bold text-gray-500 cursor-pointer hover:text-[#0f172a]"
                          onClick={() => handleSort(h.field)}>
                          <span className="flex items-center gap-1">
                            {h.label}
                            <ArrowUpDown size={14} className={sortField === h.field ? 'text-[#c29a56]' : 'text-gray-300'} />
                          </span>
                        </th>
                      ))}
                      <th className="px-5 py-4 text-right font-bold text-gray-500">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(inv => {
                      const sc = STATUS_CONFIG[inv.status];
                      return (
                        <tr key={inv.id} className="border-b hover:bg-gray-50/50 cursor-pointer transition-colors"
                          onClick={() => setSelectedInvoice(inv)}>
                          <td className="px-5 py-4 font-mono font-bold text-[#0f172a]">{inv.id}</td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-[#0f172a]">{inv.lead_name}</p>
                            <p className="text-gray-400 text-xs">{inv.lead_phone}</p>
                          </td>
                          <td className="px-5 py-4 font-black text-[#0f172a]">{formatAmount(inv.amount)} <span className="text-gray-400 font-normal text-xs">ج.م</span></td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${sc.bg} ${sc.color}`}>
                              <sc.icon size={12} /> {sc.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-gray-500">{formatDate(inv.created_at)}</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                              {inv.checkout_url && (
                                <button onClick={() => copyToClipboard(inv.checkout_url!, inv.id)}
                                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0f172a]" title="نسخ رابط الدفع">
                                  {copiedId === inv.id ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                                </button>
                              )}
                              {inv.checkout_url && (
                                <a href={inv.checkout_url} target="_blank" rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0f172a]" title="فتح رابط الدفع">
                                  <ExternalLink size={16} />
                                </a>
                              )}
                              <button onClick={() => setSelectedInvoice(inv)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0f172a]" title="عرض التفاصيل">
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedInvoice(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-[#0f172a] p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <p className="text-[#c29a56] text-xs font-bold">تفاصيل الفاتورة</p>
                <h3 className="text-white text-xl font-black">{selectedInvoice.id}</h3>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold ${STATUS_CONFIG[selectedInvoice.status].bg} ${STATUS_CONFIG[selectedInvoice.status].color}`}>
                {STATUS_CONFIG[selectedInvoice.status].label}
              </span>
            </div>
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-gray-400 text-sm mb-1">المبلغ</p>
                <p className="text-4xl font-black text-[#0f172a]">{formatAmount(selectedInvoice.amount)} <span className="text-lg text-gray-400 font-normal">ج.م</span></p>
                <p className="text-gray-400 text-xs mt-2">{SERVICE_LABELS[selectedInvoice.service_type] || selectedInvoice.service_type}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'العميل', value: selectedInvoice.lead_name },
                  { label: 'الهاتف', value: selectedInvoice.lead_phone },
                  { label: 'الوصف', value: selectedInvoice.description },
                  { label: 'تاريخ الإنشاء', value: formatDate(selectedInvoice.created_at) },
                  { label: 'تاريخ الاستحقاق', value: formatDate(selectedInvoice.due_date) },
                  { label: 'تاريخ الدفع', value: selectedInvoice.paid_at ? formatDate(selectedInvoice.paid_at) : '—' },
                  { label: 'Stripe Session', value: selectedInvoice.stripe_session_id || '—' },
                  { label: 'رقم العميل', value: selectedInvoice.lead_id },
                ].map((d, i) => (
                  <div key={i} className={`${i === 2 ? 'col-span-2' : ''}`}>
                    <p className="text-gray-400 text-xs mb-1">{d.label}</p>
                    <p className="text-[#0f172a] font-bold text-sm">{d.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedInvoice.checkout_url && (
                  <>
                    <button onClick={() => copyToClipboard(selectedInvoice.checkout_url!, 'modal')}
                      className="flex-1 bg-[#0f172a] text-white py-3 rounded-xl font-bold hover:bg-[#1e3a5f] flex items-center justify-center gap-2 text-sm">
                      {copiedId === 'modal' ? <><CheckCircle2 size={18} /> تم النسخ</> : <><Copy size={18} /> نسخ رابط الدفع</>}
                    </button>
                    <a href={selectedInvoice.checkout_url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 bg-[#c29a56] text-white py-3 rounded-xl font-bold hover:bg-[#a88340] flex items-center justify-center gap-2 text-sm">
                      <ExternalLink size={18} /> فتح صفحة الدفع
                    </a>
                  </>
                )}
                {!selectedInvoice.checkout_url && selectedInvoice.status === 'pending' && (
                  <button className="flex-1 bg-[#c29a56] text-white py-3 rounded-xl font-bold hover:bg-[#a88340] flex items-center justify-center gap-2 text-sm">
                    <Send size={18} /> إنشاء رابط دفع
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0f172a] p-6 rounded-t-3xl">
              <h3 className="text-white text-xl font-black flex items-center gap-2"><Plus size={24} className="text-[#c29a56]" /> فاتورة جديدة</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2 text-right">اسم العميل *</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right" placeholder="اسم العميل" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#0f172a] mb-2 text-right">رقم الهاتف *</label>
                  <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left" placeholder="01XXXXXXXXX" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0f172a] mb-2 text-right">المبلغ (ج.م) *</label>
                  <input type="number" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-left" placeholder="5000" dir="ltr" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2 text-right">نوع الخدمة</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right">
                  <option value="">اختر الخدمة</option>
                  {Object.entries(SERVICE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2 text-right">الوصف</label>
                <textarea className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right" rows={3} placeholder="وصف الفاتورة..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-100 text-[#0f172a] py-3 rounded-xl font-bold">إلغاء</button>
                <button onClick={() => setShowCreateModal(false)} className="flex-1 bg-[#c29a56] text-white py-3 rounded-xl font-bold hover:bg-[#a88340] flex items-center justify-center gap-2">
                  <Send size={18} /> إنشاء وإرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
