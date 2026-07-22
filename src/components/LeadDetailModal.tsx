import { useState } from 'react';
import {
  X, Phone, Mail, Calendar, Clock, MessageSquare, User, Tag,
  CheckCircle2, AlertCircle, ArrowRight, Save
} from 'lucide-react';

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

interface Props {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, updates: { status?: string; notes?: string; assigned_to?: string }) => void;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  new: { label: 'جديد', color: 'text-blue-700', bg: 'bg-blue-100', icon: AlertCircle },
  contacted: { label: 'تم التواصل', color: 'text-amber-700', bg: 'bg-amber-100', icon: Phone },
  converted: { label: 'تم التحويل', color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle2 },
  lost: { label: 'مفقود', color: 'text-red-700', bg: 'bg-red-100', icon: X },
};

const STATUS_FLOW = ['new', 'contacted', 'converted', 'lost'];

export default function LeadDetailModal({ lead, onClose, onUpdate }: Props) {
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'conversation' | 'analytics'>('info');

  const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
  const StatusIcon = statusCfg.icon;

  const handleSaveNotes = async () => {
    setSaving(true);
    await onUpdate(lead.id, { notes });
    setSaving(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    await onUpdate(lead.id, { status: newStatus });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('ar-EG', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '—';
    const map: Record<string, string> = {
      morning: 'صباحاً (8-12)',
      afternoon: 'ظهراً (12-4)',
      evening: 'مساءً (4-6)',
    };
    return map[timeStr] || timeStr;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c29a56] rounded-full flex items-center justify-center text-xl font-black">
              {lead.name?.charAt(0) || '?'}
            </div>
            <div>
              <h2 className="text-xl font-bold">{lead.name || 'بدون اسم'}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className={`${statusCfg.bg} ${statusCfg.color} px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1`}>
                  <StatusIcon size={12} />
                  {statusCfg.label}
                </span>
                <span className="text-gray-400 text-xs">
                  {formatDate(lead.created_at)}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0f172a]/5 border-b border-gray-200 px-6 py-3 flex items-center gap-3 shrink-0">
          <span className="text-sm text-gray-500 font-bold ml-2">الحالة:</span>
          {STATUS_FLOW.map(s => {
            const cfg = STATUS_CONFIG[s];
            const isActive = lead.status === s;
            return (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? `${cfg.bg} ${cfg.color} ring-2 ring-offset-1 ring-current`
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
          <div className="flex-1" />
          <a
            href={`tel:${lead.phone}`}
            className="flex items-center gap-1.5 bg-[#0f172a] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#0f172a]/80 transition-colors"
          >
            <Phone size={14} />
            اتصل الآن
          </a>
          <a
            href={`https://wa.me/2${lead.phone?.replace(/^0/, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#25D366]/80 transition-colors"
          >
            <MessageSquare size={14} />
            واتساب
          </a>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 shrink-0">
          <div className="flex gap-1">
            {[
              { key: 'info' as const, label: 'بيانات العميل', icon: User },
              { key: 'conversation' as const, label: 'ملخص المحادثة', icon: MessageSquare },
              { key: 'analytics' as const, label: 'التحليلات', icon: Tag },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#c29a56] text-[#c29a56]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Contact Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoCard icon={<Phone size={18} className="text-[#c29a56]" />} label="رقم الهاتف" value={lead.phone} dir="ltr" />
                <InfoCard icon={<Mail size={18} className="text-[#c29a56]" />} label="البريد الإلكتروني" value={lead.email || '—'} dir="ltr" />
                <InfoCard icon={<Calendar size={18} className="text-[#c29a56]" />} label="التاريخ المفضل" value={lead.preferred_date ? formatDate(lead.preferred_date) : '—'} />
                <InfoCard icon={<Clock size={18} className="text-[#c29a56]" />} label="الوقت المفضل" value={formatTime(lead.preferred_time)} />
              </div>

              {/* Service Type */}
              <div className="bg-[#0f172a]/5 rounded-xl p-4">
                <div className="text-xs text-gray-500 font-bold mb-1">نوع الاستشارة</div>
                <div className="text-[#0f172a] font-bold">{lead.consultation_type || lead.service_type || '—'}</div>
              </div>

              {/* Description */}
              {lead.description && (
                <div className="bg-[#0f172a]/5 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-bold mb-1">وصف الاستفسار</div>
                  <div className="text-[#0f172a] text-sm leading-relaxed">{lead.description}</div>
                </div>
              )}

              {/* Form Source */}
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <ArrowRight size={12} />
                مصدر النموذج: <span className="font-bold text-gray-600">{lead.form_name || 'غير محدد'}</span>
              </div>
            </div>
          )}

          {activeTab === 'conversation' && (
            <div className="space-y-4">
              {/* AI Chatbot Summary */}
              {(lead.summary || lead.description) ? (
                <div className="bg-[#0f172a] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={16} className="text-[#c29a56]" />
                    <span className="text-[#c29a56] text-xs font-bold">ملخص المحادثة مع المساعد الذكي</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {lead.summary || lead.description}
                  </p>
                  {lead.source && (
                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-500">
                      المصدر: {lead.source === 'chatbot_widget' ? 'ويدجت الدردشة' : lead.source}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد محادثة مسجلة</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-bold mb-1">مصدر الزيارة</div>
                  <div className="text-[#0f172a] font-bold">{lead.utm_source || 'مباشر'}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-bold mb-1">وسيط التسويق</div>
                  <div className="text-[#0f172a] font-bold">{lead.utm_medium || 'عضوي'}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-bold mb-1">الحملة</div>
                  <div className="text-[#0f172a] font-bold">{lead.utm_campaign || '—'}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-bold mb-1">آخر تحديث</div>
                  <div className="text-[#0f172a] font-bold text-sm">{formatDate(lead.updated_at)}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 font-bold mb-3">الجدول الزمني</div>
                <div className="space-y-3">
                  <TimelineItem label="تاريخ الإنشاء" value={formatDate(lead.created_at)} active />
                  {lead.status !== 'new' && (
                    <TimelineItem label="تم التواصل" value={formatDate(lead.updated_at)} active={lead.status === 'contacted'} />
                  )}
                  {(lead.status === 'converted' || lead.status === 'lost') && (
                    <TimelineItem
                      label={lead.status === 'converted' ? 'تم التحويل ✅' : 'مفقود ❌'}
                      value={formatDate(lead.updated_at)}
                      active
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer — Notes */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 font-bold mb-1 block">ملاحظات المحامي</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#c29a56] focus:border-[#c29a56] outline-none"
                placeholder="أضف ملاحظاتك هنا..."
              />
            </div>
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="mt-5 bg-[#c29a56] text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#a88340] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={14} />
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Helper Components ----

function InfoCard({ icon, label, value, dir }: { icon: React.ReactNode; label: string; value: string; dir?: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-gray-500 font-bold mb-0.5">{label}</div>
        <div className="text-[#0f172a] font-bold text-sm" dir={dir || 'rtl'}>{value}</div>
      </div>
    </div>
  );
}

function TimelineItem({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${active ? 'bg-[#c29a56]' : 'bg-gray-300'}`} />
      <div className="flex-1">
        <span className={`text-sm font-bold ${active ? 'text-[#0f172a]' : 'text-gray-400'}`}>{label}</span>
      </div>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
  );
}
