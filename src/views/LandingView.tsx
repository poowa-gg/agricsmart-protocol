import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Database, Smartphone, Users, X } from 'lucide-react';
import { formatNaira, cn } from '../lib/utils';

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  const [showDemo, setShowDemo] = React.useState(false);
  const [demoStep, setDemoStep] = React.useState(0);

  const demoSteps = [
    {
      title: "The Invisible Farmer",
      description: "Peter is one of 38 million Nigerian farmers with no financial record. He has the land and the skills, but no way to prove his reliability to banks.",
      icon: Users,
    },
    {
      title: "Digital Enrollment",
      description: "Using just a basic feature phone, Peter dials *347# to enroll. His location and farm data are logged instantly, creating his first digital footprint.",
      icon: Smartphone,
    },
    {
      title: "Agent Verification",
      description: "Our network of 10,000+ local agents visit Peter's farm. They verify GPS coordinates and crop health, stopping fraud and building trust.",
      icon: ShieldCheck,
    },
    {
      title: "Creditworthy Success",
      description: "As Peter buys inputs and sells harvests via our platform, his score grows. He's no longer invisible—he's a bankable entrepreneur.",
      icon: TrendingUp,
    }
  ];

  const stats = [
    { label: "Fraud Prevented", value: "₦15B+", icon: ShieldCheck, color: "text-ag-green-dark" },
    { label: "Farmers Served", value: "38M", icon: Users, color: "text-trust-blue" },
    { label: "Network Size", value: "10K+", icon: Smartphone, color: "text-credit-gold" },
    { label: "Market Opportunity", value: "₦34T", icon: TrendingUp, color: "text-ag-green-dark" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-ag-green-dark/10 text-ag-green-dark rounded-full text-xs font-black tracking-[0.2em]"
          >
            <ShieldCheck size={14} />
            <span>NIGERIA'S FIRST FARMER CREDIT BUREAU</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black leading-[0.95] tracking-tight text-natural-text"
          >
            From <span className="italic text-natural-muted/30">Invisible</span> <br />
            To <span className="text-ag-green-dark">Creditworthy.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-natural-muted max-w-xl leading-relaxed font-medium"
          >
            Empowering 38 million smallholder farmers to unlock the ₦34 trillion agricultural economy through agent verification and a living Trust Score.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={onStart}
              className="bg-ag-green-dark text-white px-10 py-5 rounded-full font-black text-lg flex items-center gap-2 hover:scale-[1.03] transition-transform shadow-2xl shadow-ag-green-dark/20"
            >
              Start Peter's Journey
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setShowDemo(true)}
              className="bg-white border border-natural-border text-natural-text px-10 py-5 rounded-full font-bold text-lg hover:bg-natural-soft transition-colors"
            >
              Watch Demo
            </button>
          </motion.div>

          <AnimatePresence>
            {showDemo && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-natural-text/40 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white max-w-2xl w-full rounded-[4rem] shadow-2xl overflow-hidden flex flex-col"
                >
                  <div className="bg-ag-green-dark p-12 text-white text-center relative">
                    <button 
                      onClick={() => setShowDemo(false)}
                      className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full"
                    >
                      <X size={20} />
                    </button>
                    <div className="w-20 h-20 bg-white/10 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                      {React.createElement(demoSteps[demoStep].icon, { size: 32 })}
                    </div>
                    <h3 className="text-3xl font-black mb-4">{demoSteps[demoStep].title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">
                      {demoSteps[demoStep].description}
                    </p>
                  </div>
                  
                  <div className="p-8 flex items-center justify-between border-t border-natural-border">
                    <div className="flex gap-2">
                      {demoSteps.map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-1 rounded-full transition-all",
                            i === demoStep ? "w-8 bg-ag-green-dark" : "w-4 bg-natural-soft"
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {demoStep > 0 && (
                        <button 
                          onClick={() => setDemoStep(s => s - 1)}
                          className="px-6 py-3 rounded-full border border-natural-border font-bold text-sm"
                        >
                          Back
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          if (demoStep < demoSteps.length - 1) {
                            setDemoStep(s => s + 1);
                          } else {
                            setShowDemo(false);
                            onStart();
                          }
                        }}
                        className="px-8 py-3 rounded-full bg-trust-blue text-white font-bold text-sm shadow-xl shadow-trust-blue/20"
                      >
                        {demoStep === demoSteps.length - 1 ? "Start Peter's Journey" : "Next Step"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex-1 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 w-full aspect-square bg-white rounded-[4rem] border border-natural-border shadow-2xl flex items-center justify-center overflow-hidden"
          >
            {/* Visual representation of the trust score or farmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-ag-green-dark/5 to-transparent"></div>
            <div className="z-20 text-center space-y-8">
              <div className="w-64 h-64 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-natural-soft" />
                  <circle 
                    cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="16" fill="transparent" 
                    strokeDasharray={2 * Math.PI * 110}
                    strokeDashoffset={2 * Math.PI * 110 * 0.2}
                    className="text-ag-green-dark animate-pulse"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-8xl font-black text-natural-text">82</span>
                  <span className="text-xs font-black text-ag-green uppercase tracking-[0.3em]">Score</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-natural-muted">Farmer Trust Profile</p>
                <p className="text-3xl font-black text-trust-blue">Verified Level 3</p>
              </div>
            </div>


            {/* Decorative floating elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute top-12 left-12 p-4 bg-white rounded-3xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Database size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-40">Verification</p>
                <p className="font-bold">Verified Agent</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute bottom-12 right-12 p-4 bg-white rounded-3xl shadow-xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Smartphone size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-40">Active Sales</p>
                <p className="font-bold">2 Tons Maize</p>
              </div>
            </motion.div>
            </motion.div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 py-16 border-y border-[#141414]/5">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
          >
            <div className="flex items-center gap-3 mb-2">
              <stat.icon size={18} className={stat.color} />
              <span className="text-xs font-bold uppercase tracking-widest text-[#141414]/40">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Trust Hero Section */}
      <section className="py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">The Trust Score Economy</h2>
          <p className="text-[#141414]/60 text-lg">We use local verification and transaction data to build a digital financial identity for those formerly ignored by the system.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[3rem] bg-white border border-natural-border hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-ag-green-dark/10 rounded-[20px] flex items-center justify-center text-ag-green-dark mb-8 group-hover:bg-ag-green-dark group-hover:text-white transition-all">
              <Smartphone size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">USSD Enrollment</h3>
            <p className="text-natural-muted font-medium leading-relaxed">No smartphone? No problem. Farmers enroll via a simple *347# menu on basic feature phones.</p>
          </div>

          <div className="p-10 rounded-[3rem] bg-white border border-natural-border hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-trust-blue/10 rounded-[20px] flex items-center justify-center text-trust-blue mb-8 group-hover:bg-trust-blue group-hover:text-white transition-all">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Agent Verification</h3>
            <p className="text-natural-muted font-medium leading-relaxed">Local agents visit farms, verify GPS coordinates, and confirm crop types to eliminate fraud.</p>
          </div>

          <div className="p-10 rounded-[3rem] bg-white border border-natural-border hover:shadow-xl transition-all group">
            <div className="w-14 h-14 bg-credit-gold/10 rounded-[20px] flex items-center justify-center text-credit-gold mb-8 group-hover:bg-credit-gold group-hover:text-white transition-all">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Dynamic Credit</h3>
            <p className="text-natural-muted font-medium leading-relaxed">As farmers buy inputs and sell harvests, their Trust Score climbs, unlocking cheaper insurance and loans.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
