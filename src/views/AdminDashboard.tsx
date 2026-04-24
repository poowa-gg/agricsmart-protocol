import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Map as MapIcon, 
  ArrowUpRight, 
  Smartphone,
  Globe,
  Database
} from 'lucide-react';
import { MOCK_FARMERS } from '../mockData';
import { formatNaira, cn } from '../lib/utils';
import { farmerService } from '../services/farmerService';

import SMSNotificationCenter from '../components/SMSNotificationCenter';

export default function AdminDashboard() {
  const [isSeeding, setIsSeeding] = React.useState(false);


  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await farmerService.seedDatabase();
      alert("Database seeded with sample farmers and agents!");
    } catch (e) {
      console.error(e);
      alert("Seed failed. Ensure you are signed in or rules allow.");
    } finally {
      setIsSeeding(false);
    }
  };

  const chartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 2100 },
    { name: 'Mar', value: 3800 },
    { name: 'Apr', value: 5400 },
  ];

  const pieData = [
    { name: 'Verified', value: 78, color: '#4CAF50' },
    { name: 'Pending', value: 18, color: '#FFB800' },
    { name: 'Rejected', value: 4, color: '#FF4C4C' },
  ];

  const mainStats = [
    { label: "Total Enrolled", value: "38.2M", change: "+12.5%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Trust Economy", value: "₦34.2T", change: "+5.2%", icon: TrendingUp, color: "text-[#4CAF50]", bg: "bg-[#4CAF50]/10" },
    { label: "Active Agents", value: "12,450", change: "+1.2k", icon: Smartphone, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Fraud Stopped", value: "₦15.4B", change: "+₦120M", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">System Overview</h1>
          <p className="text-[#141414]/50 font-medium">Global analytics for Nigeria's Farmer Credit Bureau.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeed}
            disabled={isSeeding}
            className="px-6 py-3 rounded-2xl bg-[#4CAF50]/10 text-[#4CAF50] font-bold text-sm hover:bg-[#4CAF50]/20 transition-colors flex items-center gap-2"
          >
            <Database size={16} />
            {isSeeding ? "Seeding..." : "Seed Mock Data"}
          </button>
          <button className="px-6 py-3 rounded-2xl bg-[#141414] text-white font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-[#141414]/20">
            <Globe size={16} />
            Export Live Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {mainStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-[#141414]/5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight size={10} />
                {stat.change}
              </div>
            </div>
            <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-[#141414]/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Enrollment Growth</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-[#4CAF50]"></div>
                Farmers
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#14141408" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#14141440' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#14141440' }}
                />
                <Tooltip 
                  cursor={{ fill: '#4CAF5008' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#4CAF50" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-white p-8 rounded-[3rem] border border-[#141414]/5 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold mb-8 text-center">Verification Status</h3>
          <div className="flex-1 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase opacity-40">{item.name}</p>
                  <p className="text-sm font-bold">{item.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fraud Detection Alerts */}
        <div className="bg-white p-8 rounded-[3rem] border border-natural-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <ShieldAlert className="text-red-500" size={24} />
              Fraud Detection Alerts
            </h3>
            <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">4 Alerts</span>
          </div>
          <div className="space-y-4">
             {[
               { id: 1, type: 'Zombie Registration', description: '200 enrollments from a single phone ID in Karu.', severity: 'High' },
               { id: 2, type: 'GPS Mismatch', description: 'Agent #AG-45 verified location 50km from enrollment.', severity: 'Medium' },
               { id: 3, type: 'Identity Spoofing', description: 'Conflict detected in Farmer ID registry for Kano.', severity: 'High' }
             ].map(alert => (
               <div key={alert.id} className="p-4 rounded-2xl bg-red-50/30 border border-red-100 flex items-center gap-4">
                 <div className={cn(
                   "w-2 h-2 rounded-full",
                   alert.severity === 'High' ? "bg-red-500" : "bg-amber-500"
                 )} />
                 <div className="flex-1">
                   <p className="font-bold text-sm text-red-900">{alert.type}</p>
                   <p className="text-xs text-red-700/60 font-medium">{alert.description}</p>
                 </div>
                 <button className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline">Resolve</button>
               </div>
             ))}
          </div>
        </div>

        {/* SMS Notifications Simulation */}
        <SMSNotificationCenter />
      </div>

      {/* System Logs */}
      <div className="mt-8 bg-ag-green-dark p-8 rounded-[3rem] text-white">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
            <Database className="text-white/40" size={24} />
            System Audit Logs
          </h3>
          <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white underline">Export All Logs</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_FARMERS.map(farmer => (
            <div key={farmer.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xs font-black">
                  {farmer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm leading-none mb-1">{farmer.name}</p>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">{farmer.location.lga}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-white/40 mb-1">{farmer.id}</p>
                <div className="flex items-center gap-1 justify-end">
                   <div className="w-1 h-1 rounded-full bg-ag-green"></div>
                   <p className="text-[8px] font-black text-ag-green uppercase tracking-widest">Enrolled</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
