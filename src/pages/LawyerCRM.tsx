import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, ChevronDown, ChevronUp, RefreshCw, Users, Phone,
  CheckCircle2, AlertCircle, Clock, TrendingUp, BarChart3,
  Eye, ArrowUpDown, CreditCard, Bell, X
} from 'lucide-react';
import { clearStaffSession, getStaffSession } from '../lib/staffAuth';
import LeadDetailModal from '../components/LeadDetailModal';
import {
  subscribeToNotifications,
  getNotificationHistory,
  markAllAsRead,
  getUnreadCount,
  generateDemoNotifications,
  requestNotificationPermission,
  type NotificationEvent,
} from '../lib/notificationService';

// ---- Types ----
interface Lead {
  id: string;
  form_name: string;
  service_type: string;
  consultation_type: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  description: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  status: string;
  assigned_to: string;
  notes: string;
  created_at: string;
  updated_at: string;
  summary?: string;
  source?: string;
}

type SortField = 'name' | 'status' | 'created_at' | 'service_type';
type SortDir = 'asc' | 'desc';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'جديد', color: 'text-blue-700', bg: 'bg-blue-100' },
  contacted: { label: 'تم التواصل', color: 'text-amber-700', bg: 'bg-amber-100' },
  converted: { label: 'تم التحويل', color: 'text-green-700', bg: 'bg-green-100' },
  lost: { label: 'مفقود', color: 'text-red-700', bg: 'bg-red-100' },
};

// ---- Main Dashboard ----
export default function LawyerCRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [skeletonRows] = useState(5);
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Load leads
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const supabaseUrl = (window as any).__SUPABASE_URL__ || import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const session = getStaffSession();

        if (supabaseUrl && supabaseKey && session) {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/leads?select=*&order=created_at.desc&limit=100`,
            {
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              setLeads(data);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.log('Using demo data:', err);
      }

      setLeads([]);
      setLoading(false);
    };

    fetchLeads();
  }, []);

  // Notifications
  useEffect(() => {
    generateDemoNotifications();
    setNotifications(getNotificationHistory());
    setUnreadCount(getUnreadCount());
    requestNotificationPermission();

    const unsubscribe = subscribeToNotifications((event) => {
      setNotifications(prev => [event, ...prev]);
      setUnreadCount(getUnreadCount());
    });

    return unsubscribe;
  }, []);

  // Close notif panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Stats
  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    lost: leads.filter(l => l.status === 'lost').length,
    conversionRate: leads.length > 0
      ? ((leads.filter(l => l.status === 'converted').length / leads.length) * 100).toFixed(1)
      : '0',
  }), [leads]);

  // Filter + Search + Sort
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(l => l.status === statusFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.consultation_type?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aVal: string = '';
      let bVal: string = '';

      if (sortField === 'name') { aVal = a.name || ''; bVal = b.name || ''; }
      else if (sortField === 'status') { aVal = a.status || ''; bVal = b.status || ''; }
      else if (sortField === 'service_type') { aVal = a.service_type || ''; bVal = b.service_type || ''; }
      else { aVal = a.created_at || ''; bVal = b.created_at || ''; }

      const cmp = aVal.localeCompare(bVal, 'ar');
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [leads, statusFilter, search, sortField, sortDir]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-[#c29a56]" />
      : <ChevronDown size={14} className="text-[#c29a56]" />;
  };

  const handleUpdateLead = useCallback(async (id: string, updates: { status?: string; notes?: string; assigned_to?: string }) => {
    // Optimistic UI update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates, updated_at: new Date().toISOString() } : l));

    // Update selected lead if open
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, ...updates, updated_at: new Date().toISOString() } : null);
    }

    // Try to persist to Supabase
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const session = getStaffSession();
      if (supabaseUrl && supabaseKey && session) {
        await fetch(`${supabaseUrl}/rest/v1/leads?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ ...updates, updated_at: new Date().toISOString() }),
        });
      }
    } catch (err) {
      console.log('Update saved locally (Supabase not configured)');
    }
  }, [selectedLead]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-[#0f172a] text-white px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#c29a56] rounded-xl flex items-center justify-center">
              <BarChart3 size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black">لوحة تحكم صرح</h1>
              <p className="text-gray-400 text-xs">إدارة العملاء المحتملين — محامون ومحاسبون قانونيون</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotifPanel(!showNotifPanel);
                  if (!showNotifPanel) {
                    markAllAsRead();
                    setUnreadCount(0);
                  }
                }}
                className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors relative"
                title="الإشعارات"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              {/* Notification Panel */}
              {showNotifPanel && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-[#0f172a] px-4 py-3 flex items-center justify-between">
                    <span className="text-white font-bold text-sm">الإشعارات</span>
                    <button onClick={() => setShowNotifPanel(false)} className="text-gray-400 hover:text-white">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-gray-400 text-sm">لا توجد إشعارات</div>
                    ) : (
                      notifications.slice(0, 10).map(notif => (
                        <div key={notif.id} className={`px-4 py-3 text-right ${notif.read ? 'bg-white' : 'bg-blue-50'}`}>
                          <div className="flex items-start gap-2">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              notif.type === 'new_lead' ? 'bg-blue-500' :
                              notif.type === 'invoice_paid' ? 'bg-green-500' :
                              notif.type === 'invoice_overdue' ? 'bg-red-500' :
                              notif.type === 'lead_updated' ? 'bg-amber-500' : 'bg-gray-400'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#0f172a]">{notif.title}</p>
                              <p className="text-xs text-gray-500 mt-0.5 truncate">{notif.message}</p>
                              <p className="text-[10px] text-gray-300 mt-1">
                                {new Date(notif.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link to="/billing" className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center gap-1.5" title="الفواتير">
              <CreditCard size={16} />
              <span className="text-xs hidden sm:inline">الفواتير</span>
            </Link>
            <button
              onClick={handleRefresh}
              className="p-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              title="تحديث"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => { clearStaffSession(); window.location.reload(); }}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              خروج
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: 'الإجمالي', value: stats.total, icon: Users, color: 'text-[#0f172a]' },
            { label: 'جديد', value: stats.new, icon: AlertCircle, color: 'text-blue-600' },
            { label: 'تم التواصل', value: stats.contacted, icon: Phone, color: 'text-amber-600' },
            { label: 'تم التحويل', value: stats.converted, icon: CheckCircle2, color: 'text-green-600' },
            { label: 'مفقود', value: stats.lost, icon: Clock, color: 'text-red-600' },
            { label: 'نسبة التحويل', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'text-[#c29a56]' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <stat.icon size={18} className={`${stat.color} mx-auto mb-1`} />
              <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters + Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1">
            <Filter size={14} className="text-gray-400 ml-1" />
            {[
              { key: 'all', label: 'الكل' },
              { key: 'new', label: 'جديد' },
              { key: 'contacted', label: 'تواصل' },
              { key: 'converted', label: 'تحويل' },
              { key: 'lost', label: 'مفقود' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === f.key
                    ? 'bg-[#0f172a] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {f.label}
                {f.key !== 'all' && (
                  <span className="mr-1 opacity-60">
                    ({f.key === 'new' ? stats.new : f.key === 'contacted' ? stats.contacted : f.key === 'converted' ? stats.converted : stats.lost})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pr-10 pl-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#c29a56] focus:border-[#c29a56] outline-none w-64"
              placeholder="بحث بالاسم أو الهاتف أو الاستفسار..."
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-0 bg-[#0f172a]/5 px-5 py-3 text-xs font-bold text-[#0f172a] border-b border-gray-100">
            <div className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-[#c29a56]" onClick={() => handleSort('name')}>
              <SortIcon field="name" /> العميل
            </div>
            <div className="col-span-2 hidden md:block">الهاتف</div>
            <div className="col-span-3 flex items-center gap-1 cursor-pointer hover:text-[#c29a56]" onClick={() => handleSort('service_type')}>
              <SortIcon field="service_type" /> نوع الاستشارة
            </div>
            <div className="col-span-1 flex items-center gap-1 cursor-pointer hover:text-[#c29a56] justify-center" onClick={() => handleSort('status')}>
              <SortIcon field="status" /> الحالة
            </div>
            <div className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-[#c29a56] justify-center" onClick={() => handleSort('created_at')}>
              <SortIcon field="created_at" /> التاريخ
            </div>
            <div className="col-span-1 text-center">تفاصيل</div>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="divide-y divide-gray-50">
              {Array.from({ length: skeletonRows }).map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-0 px-5 py-4 animate-pulse">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-200 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-gray-200 rounded w-24" />
                      <div className="h-2 bg-gray-100 rounded w-16" />
                    </div>
                  </div>
                  <div className="col-span-2 hidden md:flex items-center">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="col-span-3 flex items-center">
                    <div className="h-3 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="h-5 bg-gray-200 rounded-full w-14" />
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="h-6 bg-gray-200 rounded w-6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-bold">لا توجد نتائج</p>
              <p className="text-sm mt-1">جرّب تغيير معايير البحث أو الفلتر</p>
            </div>
          ) : (
            /* Lead Rows */
            <div className="divide-y divide-gray-50">
              {filteredLeads.map(lead => {
                const cfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                return (
                  <div
                    key={lead.id}
                    className="grid grid-cols-12 gap-0 px-5 py-4 hover:bg-[#c29a56]/5 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {/* Name + Avatar */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0f172a] rounded-full flex items-center justify-center text-[#c29a56] text-sm font-black shrink-0">
                        {lead.name?.charAt(0) || '?'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-[#0f172a] truncate">{lead.name || 'بدون اسم'}</div>
                        <div className="text-xs text-gray-400 truncate">{lead.email || lead.form_name}</div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-span-2 hidden md:flex items-center">
                      <span className="text-sm text-gray-600" dir="ltr">{lead.phone || '—'}</span>
                    </div>

                    {/* Service */}
                    <div className="col-span-3 flex items-center">
                      <span className="text-sm text-gray-600 truncate">{lead.consultation_type || lead.service_type || '—'}</span>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 flex items-center justify-center">
                      <span className={`${cfg.bg} ${cfg.color} px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap`}>
                        {cfg.label}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="text-xs text-gray-400">{formatDate(lead.created_at)}</span>
                    </div>

                    {/* Action */}
                    <div className="col-span-1 flex items-center justify-center">
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedLead(lead); }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#c29a56] hover:bg-[#c29a56]/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          {!loading && filteredLeads.length > 0 && (
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100">
              <span>عرض {filteredLeads.length} من {leads.length} عميل</span>
              <span>آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
        />
      )}
    </div>
  );
}
