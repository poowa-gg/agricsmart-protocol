import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Map as MapIcon, 
  Users, 
  ShieldCheck, 
  Database, 
  Smartphone, 
  UserCircle, 
  Menu,
  X,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { cn } from './lib/utils';

// Views
import LandingView from './views/LandingView';
import EnrollmentView from './views/EnrollmentView';
import AgentDashboard from './views/AgentDashboard';
import BankPortal from './views/BankPortal';
import AdminDashboard from './views/AdminDashboard';
import InsuranceModule from './components/InsuranceModule';
import InvestorPortal from './views/InvestorPortal';

type AppView = 'landing' | 'enrollment' | 'agent' | 'bank' | 'admin' | 'insurance' | 'investor';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [peterScore, setPeterScore] = useState(30);
  const [peterStatus, setPeterStatus] = useState<'pending' | 'verified'>('pending');

  const navItems = [
    { id: 'landing', label: 'Home', icon: Landmark },
    { id: 'enrollment', label: 'Farmer Sim', icon: Smartphone },
    { id: 'agent', label: 'Agent Portal', icon: ShieldCheck },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'bank', label: 'Bank Portal', icon: Database },
    { id: 'investor', label: 'Investor', icon: TrendingUp },
    { id: 'admin', label: 'Admin', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-ag-green/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 bg-ag-green-dark rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-ag-green-dark">AgricSmart <span className="text-trust-blue">Connect</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as AppView)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                    currentView === item.id 
                      ? "bg-ag-green-dark text-white shadow-lg shadow-ag-green-dark/20" 
                      : "hover:bg-natural-soft text-natural-muted"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="h-8 w-px bg-natural-border ml-2"></div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView('investor')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 transition-all",
                currentView === 'investor' 
                  ? "bg-white text-trust-blue border-2 border-trust-blue" 
                  : "bg-trust-blue text-white shadow-trust-blue/20 hover:bg-trust-blue/90"
              )}
            >
              <TrendingUp size={16} />
              Investor Portal
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#141414]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-natural-text/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-sm bg-white shadow-2xl pt-24 px-6 md:hidden flex flex-col"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => {
                      setCurrentView(item.id as AppView);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-[2rem] text-lg font-black transition-all",
                      currentView === item.id 
                        ? "bg-ag-green-dark text-white shadow-xl shadow-ag-green-dark/20" 
                        : "text-natural-muted hover:bg-natural-soft"
                    )}
                  >
                    <item.icon size={24} />
                    {item.label}
                  </motion.button>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto mb-10"
              >
                <button 
                  onClick={() => {
                    setCurrentView('investor');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "w-full py-4 rounded-[2rem] font-bold text-sm shadow-xl flex items-center justify-center gap-3 transition-all",
                    currentView === 'investor'
                      ? "bg-white text-trust-blue border-2 border-trust-blue"
                      : "bg-trust-blue text-white shadow-trust-blue/20"
                  )}
                >
                  <TrendingUp size={20} />
                  Investor Portal
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {currentView === 'landing' && <LandingView onStart={() => setCurrentView('enrollment')} />}
            {currentView === 'enrollment' && <EnrollmentView />}
            {currentView === 'agent' && <AgentDashboard />}
            {currentView === 'insurance' && (
              <div className="py-12">
                <InsuranceModule 
                  farmerId="F-PETER" 
                  isEnrolled={peterScore >= 45} 
                  onEnroll={() => setPeterScore(s => s + 15)} 
                  trustScore={peterScore} 
                />
              </div>
            )}
            {currentView === 'bank' && <BankPortal />}
            {currentView === 'admin' && <AdminDashboard />}
            {currentView === 'investor' && <InvestorPortal />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Journey Demo Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-trust-blue text-white p-2 rounded-full flex items-center gap-2 shadow-2xl border border-white/10">
        <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest opacity-40 border-r border-white/10">
          DEMO MODE
        </div>
        <button 
          onClick={() => { setPeterStatus('verified'); setPeterScore(30); }}
          className={cn("px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all", peterStatus === 'verified' ? "bg-white text-trust-blue" : "hover:bg-white/10")}
        >
          1. Verify Peter
        </button>
        <button 
          onClick={() => setPeterScore(prev => prev + 15)}
          className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase hover:bg-white/10"
        >
          2. Activity (+15)
        </button>
        <div className="px-4 py-1.5 bg-white/10 rounded-full flex items-center gap-2">
          <span className="text-[10px] font-bold opacity-40">SCORE</span>
          <span className="text-sm font-black text-white">{peterScore}</span>
        </div>
      </div>

      {/* Footer / Success Metrics */}
      <footer className="bg-ag-green-dark text-white py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex gap-4 items-center min-w-[150px]">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest leading-none">Market Target</span>
            <span className="text-2xl font-black">38M Farmers</span>
          </div>
          <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-1/4"></div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Impact Stats</span>
              <span className="text-sm font-bold">₦34.2T Transposed</span>
            </div>
            <div className="w-px h-8 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Status</span>
              <span className="text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Secure Network
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] pt-8 border-t border-white/5">
          © 2026 AgricSmart Connect • Empowering Nigeria's Smallholder Farmers
        </div>
      </footer>
    </div>
  );
}
