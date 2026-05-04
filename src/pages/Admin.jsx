import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, FileText, MessageSquare, Settings,
  TrendingUp, ArrowUpRight, ArrowDownRight, MoreVertical,
  Plus, Search, Bell, LogOut, Scale, CheckCircle, Clock, XCircle,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'

/* ── mock data ── */
const areaData = [
  { month: 'يناير', قانونية: 12, محاسبية: 8 },
  { month: 'فبراير', قانونية: 18, محاسبية: 14 },
  { month: 'مارس',  قانونية: 15, محاسبية: 20 },
  { month: 'أبريل', قانونية: 25, محاسبية: 18 },
  { month: 'مايو',  قانونية: 22, محاسبية: 25 },
  { month: 'يونيو', قانونية: 30, محاسبية: 28 },
]

const pieData = [
  { name: 'استشارات قانونية', value: 35 },
  { name: 'قضايا شركات',      value: 25 },
  { name: 'محاسبة',           value: 22 },
  { name: 'ضرائب وزكاة',      value: 18 },
]
const PIE_COLORS = ['#163863', '#c9a227', '#2a64a5', '#e2b93b']

const recentRequests = [
  { id: 1, name: 'أحمد المحمد',   service: 'استشارة قانونية',  date: '2024-12-01', status: 'pending' },
  { id: 2, name: 'سارة الزهراني', service: 'تدقيق مالي',       date: '2024-11-30', status: 'active' },
  { id: 3, name: 'خالد العتيبي',  service: 'قضية شركة',        date: '2024-11-29', status: 'done' },
  { id: 4, name: 'نورة الدوسري',  service: 'صياغة عقد',        date: '2024-11-28', status: 'pending' },
  { id: 5, name: 'فيصل السعيد',   service: 'إقرار ضريبي',      date: '2024-11-27', status: 'done' },
]

const stats = [
  { label: 'إجمالي العملاء',   value: '512',  delta: '+8%',  up: true,  icon: Users },
  { label: 'الطلبات النشطة',   value: '38',   delta: '+12%', up: true,  icon: FileText },
  { label: 'طلبات جديدة',      value: '14',   delta: '+3%',  up: true,  icon: MessageSquare },
  { label: 'معدل الإنجاز',     value: '94%',  delta: '-2%',  up: false, icon: TrendingUp },
]

const navItems = [
  { id: 'dashboard', label: 'لوحة التحكم',   Icon: LayoutDashboard },
  { id: 'clients',   label: 'العملاء',        Icon: Users },
  { id: 'requests',  label: 'الطلبات',        Icon: FileText },
  { id: 'messages',  label: 'الرسائل',        Icon: MessageSquare },
  { id: 'settings',  label: 'الإعدادات',      Icon: Settings },
]

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-700', Icon: Clock },
  active:  { label: 'نشط',          color: 'bg-blue-100 text-blue-700',   Icon: CheckCircle },
  done:    { label: 'مكتمل',        color: 'bg-green-100 text-green-700', Icon: CheckCircle },
  closed:  { label: 'مغلق',         color: 'bg-red-100 text-red-700',     Icon: XCircle },
}

/* ── Dashboard tab ── */
function DashboardTab() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary-600" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.delta}
              </span>
            </div>
            <div className="text-2xl font-black text-primary-800">{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-primary-800">الطلبات الشهرية</h3>
            <span className="text-xs text-gray-400">آخر 6 أشهر</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#163863" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#163863" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a227" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#c9a227" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Cairo' }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontFamily: 'Cairo', fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="قانونية"  stroke="#163863" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="محاسبية" stroke="#c9a227" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-primary-800 mb-6">توزيع الخدمات</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: 'Cairo', fontSize: 11, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-semibold text-primary-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent requests */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="font-bold text-primary-800">أحدث الطلبات</h3>
          <button className="text-xs text-primary-600 font-semibold hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-semibold">
                <th className="text-right px-6 py-3">العميل</th>
                <th className="text-right px-6 py-3">الخدمة</th>
                <th className="text-right px-6 py-3">التاريخ</th>
                <th className="text-right px-6 py-3">الحالة</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentRequests.map(r => {
                const cfg = statusConfig[r.status]
                return (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-primary-800">{r.name}</td>
                    <td className="px-6 py-4 text-gray-500">{r.service}</td>
                    <td className="px-6 py-4 text-gray-400" dir="ltr">{r.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
                        <cfg.Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Placeholder tabs ── */
function PlaceholderTab({ title }) {
  return (
    <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
      <div className="text-6xl mb-4">🚧</div>
      <h3 className="text-xl font-bold text-primary-800 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">هذا القسم قيد التطوير</p>
    </div>
  )
}

/* ── Main Admin Page ── */
export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [search,    setSearch]    = useState('')

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-full w-64 bg-primary-900 flex flex-col z-40 shadow-xl">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">صرح</div>
              <div className="text-gray-400 text-xs">لوحة التحكم</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-right ${
                activeTab === id
                  ? 'bg-gold-500 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 pb-6 border-t border-white/10 pt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="mr-64 flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="بحث..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 font-arabic"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors text-sm font-semibold text-primary-700">
              <Plus className="w-4 h-4" />
              طلب جديد
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-800 flex items-center justify-center text-white text-sm font-bold">
              م
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-primary-800">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {activeTab === 'dashboard' ? 'مرحباً بك في لوحة تحكم صرح' : `إدارة ${navItems.find(n => n.id === activeTab)?.label}`}
            </p>
          </div>

          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'clients'   && <PlaceholderTab title="إدارة العملاء" />}
          {activeTab === 'requests'  && <PlaceholderTab title="إدارة الطلبات" />}
          {activeTab === 'messages'  && <PlaceholderTab title="الرسائل والاستفسارات" />}
          {activeTab === 'settings'  && <PlaceholderTab title="إعدادات المنصة" />}
        </div>
      </main>
    </div>
  )
}
