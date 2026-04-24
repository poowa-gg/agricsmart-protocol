import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Camera, 
  CheckCircle, 
  XCircle, 
  Wallet, 
  Clock,
  ArrowRight,
  Info,
  Navigation,
  FileText,
  Upload,
  Save,
  Check
} from 'lucide-react';
import { MOCK_FARMERS, MOCK_AGENTS } from '../mockData';
import { formatNaira, cn } from '../lib/utils';

export default function AgentDashboard() {
  const [activeFarmer, setActiveFarmer] = useState<typeof MOCK_FARMERS[0] | null>(null);
  const [earnings, setEarnings] = useState(MOCK_AGENTS[0].earnings);
  const [pendingFarmers, setPendingFarmers] = useState(MOCK_FARMERS.filter(f => f.verificationStatus === 'pending'));
  const [farmerPhoto, setFarmerPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_NOTES_CHARS = 500;

  // Autosave Logic
  useEffect(() => {
    if (!activeFarmer) return;

    // Load from local storage
    const savedNotes = localStorage.getItem(`notes_${activeFarmer.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes('');
    }
  }, [activeFarmer]);

  useEffect(() => {
    if (!activeFarmer) return;

    // 2 seconds of inactivity autosave
    const timeout = setTimeout(() => {
      localStorage.setItem(`notes_${activeFarmer.id}`, notes);
      setLastSaved(new Date());
    }, 2000); 

    // Every 5 seconds periodic save
    const interval = setInterval(() => {
      localStorage.setItem(`notes_${activeFarmer.id}`, notes);
      setLastSaved(new Date());
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [notes, activeFarmer]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmerPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNotes = () => {
    if (!activeFarmer) return;
    setIsSaving(true);
    localStorage.setItem(`notes_${activeFarmer.id}`, notes);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 800);
  };

  const handleVerify = () => {
    if (!activeFarmer) return;
    
    // Simulate verification
    setEarnings(prev => prev + 500);
    setPendingFarmers(prev => prev.filter(f => f.id !== activeFarmer.id));
    localStorage.removeItem(`notes_${activeFarmer.id}`);
    setActiveFarmer(null);
    setFarmerPhoto(null);
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Agent Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-[32px] border border-natural-border shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black text-natural-muted uppercase tracking-[0.2em]">Agent Earnings</p>
            <p className="text-3xl font-black text-ag-green-dark">{formatNaira(earnings)}</p>
          </div>
          <div className="w-14 h-14 bg-ag-green-dark/10 rounded-2xl flex items-center justify-center text-ag-green-dark">
            <Wallet size={28} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-[32px] border border-natural-border shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black text-natural-muted uppercase tracking-[0.2em]">Verified Farmers</p>
            <p className="text-3xl font-black text-natural-text">{MOCK_AGENTS[0].farmersVerifiedCount + (MOCK_AGENTS[0].earnings !== earnings ? 1 : 0)}</p>
          </div>
          <div className="w-14 h-14 bg-trust-blue/10 rounded-2xl flex items-center justify-center text-trust-blue">
            <Users size={28} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ag-green-dark p-6 rounded-[32px] text-white flex items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Queue Size</p>
            <p className="text-3xl font-black text-white">{pendingFarmers.length}</p>
          </div>
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <Clock size={28} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="text-[#141414]/40" size={20} />
            Pending Queue
          </h3>
          <div className="space-y-3">
            {pendingFarmers.map((farmer) => (
              <motion.div 
                key={farmer.id}
                layoutId={farmer.id}
                onClick={() => setActiveFarmer(farmer)}
                className={cn(
                  "p-5 rounded-3xl border transition-all cursor-pointer",
                  activeFarmer?.id === farmer.id 
                    ? "bg-[#4CAF50]/5 border-[#4CAF50] shadow-lg shadow-[#4CAF50]/10" 
                    : "bg-white border-[#141414]/5 hover:border-[#141414]/20"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{farmer.name}</h4>
                    <p className="text-xs font-medium text-[#141414]/40 flex items-center gap-1">
                      <MapPin size={12} /> {farmer.location.lga}, {farmer.location.state}
                    </p>
                  </div>
                  <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {farmer.primaryCrop}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#141414]/70">{farmer.farmSize} Hectares</p>
                  <ArrowRight size={16} className={activeFarmer?.id === farmer.id ? "text-[#4CAF50]" : "text-[#141414]/20"} />
                </div>
              </motion.div>
            ))}
            {pendingFarmers.length === 0 && (
              <div className="py-20 text-center space-y-4 opacity-40">
                <CheckCircle size={48} className="mx-auto" />
                <p className="font-bold">Queue clear! Good job.</p>
              </div>
            )}
          </div>
        </div>

        {/* Verification Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeFarmer ? (
              <motion.div 
                key={activeFarmer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] border border-[#141414]/5 shadow-xl p-8 sticky top-24"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Verify: {activeFarmer.name}</h2>
                    <p className="text-[#141414]/50 font-medium">Farmer ID: <span className="text-[#141414] font-mono">{activeFarmer.id}</span></p>
                  </div>
                  <button onClick={() => setActiveFarmer(null)} className="p-2 hover:bg-[#141414]/5 rounded-full">
                    <XCircle size={24} className="text-[#141414]/30" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#141414]/40 flex items-center gap-2">
                        <Navigation size={14} /> GPS Location (Lat/Lng)
                      </label>
                      <div className="flex gap-4">
                        <div className="flex-1 bg-[#141414]/5 p-4 rounded-2xl font-mono text-sm border border-[#141414]/5">
                          8.9950
                        </div>
                        <div className="flex-1 bg-[#141414]/5 p-4 rounded-2xl font-mono text-sm border border-[#141414]/5">
                          7.5850
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-widest text-[#141414]/40 flex items-center gap-2">
                          <FileText size={14} /> Farm Visit Notes
                        </label>
                        <div className="flex items-center gap-3">
                           {lastSaved && (
                             <span className="text-[9px] font-bold text-ag-green-dark/60 uppercase">
                               Autosaved {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                           )}
                           <span className={cn(
                             "text-[10px] font-bold",
                             notes.length > MAX_NOTES_CHARS * 0.9 ? "text-red-500" : "text-natural-muted/60"
                           )}>
                             {notes.length}/{MAX_NOTES_CHARS}
                           </span>
                        </div>
                      </div>
                      <div className="relative">
                        <textarea 
                          value={notes}
                          onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_CHARS))}
                          className="w-full bg-[#141414]/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ag-green-dark/20 min-h-[120px] transition-all"
                          placeholder="e.g. Soil quality looks good, maize is currently at 4-week growth stage..."
                        />
                        <button 
                          onClick={handleSaveNotes}
                          className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-xl border border-natural-border shadow-sm flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
                        >
                          {isSaving ? <Clock size={12} className="animate-spin" /> : <Save size={12} />}
                          Save Notes
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#141414]/40 flex items-center gap-2">
                      <Camera size={14} /> Photo Evidence
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square bg-[#141414]/5 rounded-3xl border-2 border-dashed border-[#141414]/10 flex flex-col items-center justify-center text-[#141414]/30 hover:bg-ag-green-dark/5 hover:border-ag-green-dark/30 transition-all cursor-pointer relative overflow-hidden"
                      >
                        {farmerPhoto ? (
                          <img src={farmerPhoto} alt="Farmer" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Camera size={32} />
                            <span className="text-[10px] font-bold mt-2 font-sans uppercase">Farmer Photo</span>
                          </>
                        )}
                        {farmerPhoto && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <Upload className="text-white" size={24} />
                          </div>
                        )}
                      </div>
                      <div className="aspect-square bg-[#141414]/5 rounded-3xl border-2 border-dashed border-[#141414]/10 flex flex-col items-center justify-center text-[#141414]/30 hover:bg-[#4CAF50]/5 hover:border-[#4CAF50]/30 transition-all cursor-pointer">
                        <MapPin size={32} />
                        <span className="text-[10px] font-bold mt-2 font-sans uppercase">Farm Asset</span>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3 text-amber-800">
                      <Info className="shrink-0" size={18} />
                      <p className="text-xs leading-relaxed font-medium">Verify that the farm size matches the USSD enrollment (<b>{activeFarmer.farmSize}ha</b>) before submitting.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#141414]/5">
                  <button 
                    onClick={handleVerify}
                    className="flex-1 bg-[#4CAF50] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4CAF50]/20 hover:scale-[1.02] transition-transform"
                  >
                    <CheckCircle size={20} />
                    Confirm & Earn ₦500
                  </button>
                  <button className="px-6 py-4 rounded-2xl border border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors">
                    Reject
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3.5rem] border border-[#141414]/5"
              >
                <div className="w-24 h-24 bg-[#141414]/5 rounded-full flex items-center justify-center text-[#141414]/20 mb-8">
                  <Navigation size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Select a farmer to verify</h3>
                <p className="text-[#141414]/40 max-w-sm leading-relaxed">
                  Start physical verification by selecting a pending request from the queue on the left.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
