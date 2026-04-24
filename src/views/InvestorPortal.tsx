import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, PieChart, Landmark, ArrowUpRight, DollarSign, Users, Globe, ShieldCheck, Briefcase, History, MapPin, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const INVESTMENT_DATA = [
  { name: 'Jan', amount: 4000, impact: 2400 },
  { name: 'Feb', amount: 3000, impact: 1398 },
  { name: 'Mar', amount: 2000, impact: 9800 },
  { name: 'Apr', amount: 2780, impact: 3908 },
  { name: 'May', amount: 1890, impact: 4800 },
  { name: 'Jun', amount: 2390, impact: 3800 },
];

const MY_PORTFOLIO_DATA = {
  totalInvested: '₦12.5M',
  currentValue: '₦14.2M',
  lifetimeReturns: '+13.6%',
  activeClusters: [
    { id: 'C1', name: 'Kano North Grains', amount: '₦4.5M', returns: '+8.2%', status: 'Active', trend: 'up' },
    { id: 'C2', name: 'Benue Central Maize', amount: '₦5.0M', returns: '+12.4%', status: 'Active', trend: 'up' },
    { id: 'C3', name: 'Ogun West Cocoa', amount: '₦3.0M', returns: '+2.1%', status: 'Pending Cycle', trend: 'neutral' },
  ],
  transactions: [
    { id: 'T1', date: 'Oct 14, 2023', cluster: 'Benue Central Maize', amount: '₦2,000,000', type: 'Investment' },
    { id: 'T2', date: 'Sep 28, 2023', cluster: 'Kano North Grains', amount: '₦150,000', type: 'Dividend' },
    { id: 'T3', date: 'Aug 12, 2023', cluster: 'Ogun West Cocoa', amount: '₦3,000,000', type: 'Investment' },
  ]
};

type ViewMode = 'market' | 'portfolio';

export default function InvestorPortal() {
  const [viewMode, setViewMode] = useState<ViewMode>('market');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-trust-blue shadow-lg shadow-trust-blue/20 rounded-xl text-white">
              <TrendingUp size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tight tracking-[-0.04em]">
              Investor <span className="text-trust-blue">{viewMode === 'market' ? 'Metrics' : 'Portfolio'}</span>
            </h1>
          </div>
          <p className="max-w-xl text-natural-muted font-medium leading-relaxed">
            {viewMode === 'market' 
              ? 'Real-time insights into the performance of the Agricultural Trust Index and its socioeconomic impact across Nigerian farming clusters.'
              : 'Track your personal agricultural investments, historical yields, and impact across your selected farming clusters.'
            }
          </p>
        </div>

        <div className="flex bg-natural-soft p-1.5 rounded-[2rem] border border-natural-border">
          <button 
            onClick={() => setViewMode('market')}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all",
              viewMode === 'market' ? "bg-white shadow-sm text-trust-blue" : "text-natural-muted hover:text-natural-text"
            )}
          >
            Market Data
          </button>
          <button 
            onClick={() => setViewMode('portfolio')}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all",
              viewMode === 'portfolio' ? "bg-white shadow-sm text-trust-blue" : "text-natural-muted hover:text-natural-text"
            )}
          >
            My Portfolio
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'market' ? (
          <motion.div 
            key="market"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Capital Deployed', value: '₦4.2B', change: '+12.5%', icon: Landmark, color: 'text-trust-blue' },
                { label: 'Verified Farmers', value: '42,809', change: '+2,400', icon: Users, color: 'text-ag-green-dark' },
                { label: 'Average Trust Index', value: '84.2', change: '+2.1', icon: ShieldCheck, color: 'text-ag-green' },
                { label: 'Impact Multiplier', value: '3.4x', change: '+0.4x', icon: Globe, color: 'text-orange-500' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-8 bg-white rounded-[2.5rem] border border-natural-border shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-natural-soft ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-natural-muted uppercase tracking-widest mb-1">{stat.label}</p>
                    <h2 className="text-3xl font-black tracking-tight">{stat.value}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Market Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-10 bg-white rounded-[3rem] border border-natural-border shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Capital Utilization</h3>
                  <select className="text-[10px] font-black uppercase tracking-widest bg-natural-soft px-4 py-2 rounded-xl outline-none border-none">
                    <option>Last 6 Months</option>
                    <option>Yearly</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={INVESTMENT_DATA}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: 800, marginBottom: '0.25rem' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#1E40AF" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorAmount)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-10 bg-white rounded-[3rem] border border-natural-border shadow-sm space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black">Social Impact Yield</h3>
                  <button className="text-[10px] font-black uppercase tracking-widest text-trust-blue hover:underline">
                    Export Segment Data
                  </button>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={INVESTMENT_DATA}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#6B7280' }}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F3F4F6' }}
                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ fontWeight: 800, marginBottom: '0.25rem' }}
                      />
                      <Bar 
                        dataKey="impact" 
                        fill="#4CAF50" 
                        radius={[6, 6, 0, 0]} 
                        barSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Cluster Analysis Table */}
            <div className="bg-white rounded-[3rem] border border-natural-border shadow-sm overflow-hidden">
              <div className="p-10 border-b border-natural-border">
                <h3 className="text-2xl font-black">Regional Cluster Yield</h3>
                <p className="text-sm font-medium text-natural-muted mt-2">Active portfolios by farming cooperatives across Nigeria.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-natural-soft/50 border-b border-natural-border">
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Cluster</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Cooperatives</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Total Yield</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Risk Profile</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-natural-border">
                    { [
                      { name: 'Kano North Grains', coops: 12, yield: '₦420M', risk: 'Low', status: 'Expanding' },
                      { name: 'Enugu South Root Crops', coops: 8, yield: '₦280M', risk: 'Moderate', status: 'Auditing' },
                      { name: 'Benue Central Maize', coops: 15, yield: '₦510M', risk: 'Low', status: 'Active' },
                      { name: 'Ogun West Cocoa', coops: 6, yield: '₦340M', risk: 'Moderate', status: 'Active' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-natural-soft/20 transition-colors cursor-pointer group">
                        <td className="px-10 py-6 font-bold text-lg group-hover:text-trust-blue transition-colors">{row.name}</td>
                        <td className="px-10 py-6 font-medium text-natural-muted">{row.coops}</td>
                        <td className="px-10 py-6 font-black">{row.yield}</td>
                        <td className="px-10 py-6">
                          <span className={cn(
                            "px-4 py-1.2 rounded-full text-[10px] font-black uppercase tracking-widest",
                            row.risk === 'Low' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                          )}>
                            {row.risk}
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                              "w-2 h-2 rounded-full",
                              row.status === 'Active' ? "bg-emerald-400" : row.status === 'Expanding' ? "bg-trust-blue" : "bg-orange-300"
                             )} />
                             <span className="text-xs font-bold">{row.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Portfolio Summary Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 bg-trust-blue text-white rounded-[3rem] shadow-xl shadow-trust-blue/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:scale-110 transition-transform">
                  <Wallet size={120} />
                </div>
                <div className="relative z-10 space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Total Active Investment</p>
                  <h2 className="text-5xl font-black tracking-tight">{MY_PORTFOLIO_DATA.totalInvested}</h2>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                    <ArrowUpRight size={18} />
                    <span>{MY_PORTFOLIO_DATA.lifetimeReturns} Lifetime Yield</span>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-white rounded-[3rem] border border-natural-border shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-ag-green-soft text-ag-green-dark rounded-2xl">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    Live Status
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-natural-muted uppercase tracking-widest">Current Valuation</p>
                  <h3 className="text-4xl font-black tracking-tight">{MY_PORTFOLIO_DATA.currentValue}</h3>
                </div>
                <div className="pt-4 border-t border-natural-border flex gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-natural-muted uppercase">Unrealized Gain</p>
                    <p className="font-bold text-emerald-600">₦1.7M</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-natural-muted uppercase">Active Days</p>
                    <p className="font-bold">248</p>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-white rounded-[3rem] border border-natural-border shadow-sm space-y-6">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                  <MapPin size={24} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-natural-muted uppercase tracking-widest">Geographic Diversification</p>
                  <h3 className="text-4xl font-black tracking-tight">3 Clusters</h3>
                </div>
                <div className="flex -space-x-2">
                  {['KN', 'BE', 'OG'].map((loc, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-natural-soft border-2 border-white flex items-center justify-center text-[10px] font-black">
                      {loc}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-trust-blue text-white border-2 border-white flex items-center justify-center text-[10px] font-black">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Active Clusters Detailed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <Briefcase className="text-trust-blue" />
                  Cluster Allocations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MY_PORTFOLIO_DATA.activeClusters.map((cluster) => (
                  <div key={cluster.id} className="p-8 bg-white rounded-[2.5rem] border border-natural-border hover:border-trust-blue/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-natural-muted uppercase tracking-widest">Cluster ID: {cluster.id}</p>
                        <h4 className="text-xl font-black group-hover:text-trust-blue transition-colors">{cluster.name}</h4>
                      </div>
                      <div className={cn(
                        "p-2 rounded-xl",
                        cluster.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-natural-soft text-natural-muted"
                      )}>
                        {cluster.trend === 'up' ? <ArrowUpRight size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-current opacity-20" />}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[8px] font-black text-natural-muted uppercase tracking-[0.15em] mb-1">Allocated</p>
                        <p className="font-black text-lg">{cluster.amount}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-natural-muted uppercase tracking-[0.15em] mb-1">Yield</p>
                        <p className="font-black text-lg text-emerald-600">{cluster.returns}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-natural-border flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-natural-muted px-3 py-1 bg-natural-soft rounded-full">
                        {cluster.status}
                      </span>
                      <button className="text-[9px] font-black uppercase tracking-widest text-trust-blue flex items-center gap-1 group-hover:underline">
                        Details <ArrowUpRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-[3rem] border border-natural-border shadow-sm overflow-hidden">
              <div className="p-10 border-b border-natural-border flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black">Investment Ledger</h3>
                  <p className="text-sm font-medium text-natural-muted mt-2">Personal transaction history and dividend distributions.</p>
                </div>
                <button className="p-3 rounded-2xl bg-natural-soft text-natural-muted hover:text-trust-blue transition-colors">
                  <History size={24} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-natural-soft/30 border-b border-natural-border">
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Date</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Reference Cluster</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Amount</th>
                      <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-natural-muted">Transaction Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-natural-border">
                    {MY_PORTFOLIO_DATA.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-natural-soft/10 transition-colors">
                        <td className="px-10 py-6 font-bold">{tx.date}</td>
                        <td className="px-10 py-6 text-natural-muted font-medium">{tx.cluster}</td>
                        <td className={cn(
                          "px-10 py-6 font-black",
                          tx.type === 'Dividend' ? "text-emerald-600" : "text-natural-text"
                        )}>
                          {tx.type === 'Dividend' ? `+ ${tx.amount}` : tx.amount}
                        </td>
                        <td className="px-10 py-6">
                          <span className={cn(
                            "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                            tx.type === 'Investment' ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          )}>
                            {tx.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// Re-using icon from constants/lucide for type safety if needed, 
// but lucide handles it via local imports here.
