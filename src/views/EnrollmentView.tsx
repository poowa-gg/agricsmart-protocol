import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, CheckCircle, ChevronRight, MapPin, Sprout, Ruler } from 'lucide-react';
import { NIGERIAN_STATES, LGAS_BY_STATE, CROPS } from '../constants';
import { cn } from '../lib/utils';

export default function EnrollmentView() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    lga: '',
    farmSize: '',
    primaryCrop: ''
  });
  const [farmerId, setFarmerId] = useState<string | null>(null);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const [showSMS, setShowSMS] = useState(false);

  const simulateEnrollment = () => {
    // Simulate API call
    setTimeout(() => {
      setFarmerId(`F-${Math.floor(1000 + Math.random() * 9000)}`);
      nextStep();
      // Show SMS after a short delay
      setTimeout(() => setShowSMS(true), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-12 items-center relative">
      <AnimatePresence>
        {showSMS && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[100] w-[300px] bg-trust-blue text-white p-4 rounded-2xl shadow-2xl border border-white/20"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">SMS Notification</span>
              <button onClick={() => setShowSMS(false)} className="text-white/40 hover:text-white font-bold">×</button>
            </div>
            <p className="text-xs font-bold leading-relaxed mb-3">
              "Welcome to AgricSmart! Your ID is <span className="text-ag-green-dark">{farmerId}</span>. An agent will visit your farm soon for verification."
            </p>
            <div className="flex justify-between items-center">
               <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest leading-none">Just now • Sim 1</span>
               <span className="text-[8px] font-bold opacity-40 uppercase tracking-widest leading-none">Concise: 114 chars</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* USSD Phone Simulation */}
      <div className="flex-1 w-full max-w-[320px] aspect-[9/18] bg-natural-text rounded-[3rem] p-4 shadow-2xl relative border-[8px] border-[#2A2A2A]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-natural-text rounded-b-2xl"></div>
        <div className="h-full bg-natural-bg rounded-[2rem] overflow-hidden flex flex-col">
          {/* USSD Header */}
          <div className="bg-ag-green-dark p-4 text-white">
            <div className="flex justify-between items-center text-[10px] font-black opacity-60 mb-2 tracking-widest leading-none">
              <span>AGRICSMART</span>
              <span>*347#</span>
            </div>
            <h3 className="font-bold">USSD Enrollment</h3>
          </div>

          {/* USSD Content */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm font-bold mb-4">Welcome to AgricSmart Connect. Enter your Full Name:</p>
                  <input 
                    type="text" 
                    placeholder="e.g. Peter Okeke"
                    className="w-full bg-[#141414]/5 border-b-2 border-[#141414]/20 p-2 text-sm focus:border-[#4CAF50] outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <button onClick={nextStep} disabled={!formData.name} className="mt-8 w-full bg-[#141414] text-white py-3 rounded-lg font-bold text-sm">1. Continue</button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm font-bold mb-4">Select your State:</p>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {NIGERIAN_STATES.slice(0, 5).map((state, i) => (
                      <button 
                        key={state}
                        onClick={() => { setFormData({...formData, state}); nextStep(); }}
                        className="w-full text-left p-3 rounded-lg hover:bg-[#4CAF50]/10 text-sm font-medium border border-[#141414]/5 transition-colors"
                      >
                        {i + 1}. {state}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm font-bold mb-4">Farm Size (Hectares):</p>
                  <input 
                    type="number" 
                    placeholder="e.g. 2.5"
                    className="w-full bg-[#141414]/5 border-b-2 border-[#141414]/20 p-2 text-sm focus:border-[#4CAF50] outline-none"
                    value={formData.farmSize}
                    onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
                  />
                  <button onClick={nextStep} disabled={!formData.farmSize} className="mt-8 w-full bg-[#141414] text-white py-3 rounded-lg font-bold text-sm">1. Next Step</button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-sm font-bold mb-4">Primary Crop:</p>
                  <div className="space-y-2">
                    {CROPS.slice(0, 4).map((crop, i) => (
                      <button 
                        key={crop}
                        onClick={() => { setFormData({...formData, primaryCrop: crop}); simulateEnrollment(); }}
                        className="w-full text-left p-3 rounded-lg hover:bg-[#4CAF50]/10 text-sm font-medium border border-[#141414]/5"
                      >
                        {i + 1}. {crop}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center text-[#4CAF50] mx-auto mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-bold text-xl mb-2">Enrollment Complete</h4>
                  <p className="text-xs text-[#141414]/60 mb-6 font-medium uppercase tracking-wider">Your unique farmer ID is:</p>
                  <div className="bg-[#141414] text-white p-4 rounded-xl font-mono text-xl mb-8 tracking-widest">
                    {farmerId}
                  </div>
                  <p className="text-sm text-[#141414]/50 italic">An agent will visit your farm in Nasarawa within 48 hours for verification.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 border-t border-[#141414]/5 flex justify-center">
            <div className="w-12 h-1 bg-[#141414]/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Info Side */}
      <div className="flex-1 space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-[#141414]">Journey 1: <br /><span className="text-[#4CAF50]">Peter's Story Starts Here</span></h2>
          <p className="text-lg text-[#141414]/60 leading-relaxed">
            Peter lives in a rural village with no stable internet. He uses his basic feature phone to dial <span className="font-bold text-[#141414]">*347#</span>. 
            This simple text-based interface is his gateway to the global financial system.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-[#4CAF50]/5 border border-[#4CAF50]/10">
            <Smartphone className="text-[#4CAF50] mb-4" size={24} />
            <h4 className="font-bold mb-1">Low-Tech Entry</h4>
            <p className="text-sm text-[#141414]/60">Works on any mobile device without data or Wi-Fi.</p>
          </div>
          <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
            <MapPin className="text-blue-600 mb-4" size={24} />
            <h4 className="font-bold mb-1">Geo-Location</h4>
            <p className="text-sm text-[#141414]/60">Automatically logs registration location for agent routing.</p>
          </div>
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100">
            <Sprout className="text-amber-600 mb-4" size={24} />
            <h4 className="font-bold mb-1">Crop Profiling</h4>
            <p className="text-sm text-[#141414]/60">Captured data helps buyers predict regional harvest output.</p>
          </div>
          <div className="p-6 rounded-3xl bg-purple-50 border border-purple-100">
            <Ruler className="text-purple-600 mb-4" size={24} />
            <h4 className="font-bold mb-1">Size Verification</h4>
            <p className="text-sm text-[#141414]/60">Farm size allows for accurate input and credit matching.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
