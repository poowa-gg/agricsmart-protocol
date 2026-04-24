import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Database, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Star,
  MapPin,
  Calendar,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
  CreditCard,
  QrCode,
  Scan,
  X,
  UserCheck
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { MOCK_FARMERS, MOCK_ACTIVITIES, MOCK_AGENTS } from '../mockData';
import { formatNaira, cn } from '../lib/utils';

export default function BankPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmerId, setSelectedFarmerId] = useState<string | null>(null);
  const [minScore, setMinScore] = useState(0);
  const [filterState, setFilterState] = useState('All');
  const [filterCrop, setFilterCrop] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isScanning, setIsScanning] = useState(false);

  const states = ['All', ...new Set(MOCK_FARMERS.map(f => f.location.state))];
  const crops = ['All', ...new Set(MOCK_FARMERS.map(f => f.primaryCrop))];
  const statuses = ['All', 'verified', 'pending', 'rejected'];

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader", 
        { fps: 10, qrbox: { width: 250, height: 250 } }, 
        /* verbose= */ false
      );

      scanner.render((decodedText) => {
        // Try to find Farmer ID in decoded text (format: "Farmer ID: AS-XXX")
        const idMatch = decodedText.match(/Farmer ID: ([\w-]+)/);
        if (idMatch && idMatch[1]) {
          const farmerId = idMatch[1];
          const exists = MOCK_FARMERS.some(f => f.id === farmerId);
          if (exists) {
            setSelectedFarmerId(farmerId);
            setIsScanning(false);
          }
        }
      }, (error) => {
        // console.warn(error);
      });

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }
  }, [isScanning]);

  const filteredFarmers = MOCK_FARMERS.filter(f => 
    (f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.id.includes(searchQuery)) &&
    f.trustScore >= minScore &&
    (filterState === 'All' || f.location.state === filterState) &&
    (filterCrop === 'All' || f.primaryCrop === filterCrop) &&
    (filterStatus === 'All' || f.verificationStatus === filterStatus)
  );

  const selectedFarmer = MOCK_FARMERS.find(f => f.id === selectedFarmerId);
  const farmerActivities = MOCK_ACTIVITIES.filter(a => a.farmerId === selectedFarmerId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">Credit Inquiry Portal</h1>
          <p className="text-[#141414]/50 font-medium">Search and verify farmer creditworthiness across Nigeria.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsScanning(true)}
            className="flex items-center gap-2 px-6 py-3 bg-ag-green-dark text-white rounded-2xl font-bold text-sm shadow-xl shadow-ag-green-dark/20 hover:scale-[1.02] transition-transform"
          >
            <Scan size={18} />
            Scan ID
          </button>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-natural-border shadow-sm">
            <div className="p-3 bg-trust-blue/10 text-trust-blue rounded-xl">
              <Database size={24} />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Connected Records</p>
              <p className="text-xl font-bold">1.2M+</p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isScanning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setIsScanning(false)}
                className="absolute top-6 right-6 p-2 hover:bg-natural-soft rounded-full z-10"
              >
                <X size={24} className="text-natural-muted" />
              </button>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black mb-2">QR ID Scanner</h3>
                <p className="text-natural-muted font-medium text-sm">Position the farmer's ID card QR code within the frame</p>
              </div>
              <div id="reader" className="w-full rounded-2xl overflow-hidden border-4 border-natural-border bg-black aspect-square"></div>
              <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.2em] text-natural-muted/40">Secure Verification System</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Search & List */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#141414]/40" size={20} />
            <input 
              type="text" 
              placeholder="Search Name or ID..."
              className="w-full bg-white border border-[#141414]/5 pl-12 pr-4 py-4 rounded-3xl outline-none focus:border-[#4CAF50] transition-colors shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-[2.5rem] border border-[#141414]/5 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#141414]/5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                  <Filter size={16} className="text-[#141414]/40" />
                  Advanced Filters
                </h3>
                <span className="text-[10px] font-black text-natural-muted/60 uppercase tracking-widest">{filteredFarmers.length} Results</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-natural-muted uppercase tracking-widest">Min. Score</label>
                  <select 
                    className="w-full text-xs font-bold bg-natural-soft p-2 rounded-xl outline-none"
                    value={minScore}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                  >
                    <option value={0}>All Scores</option>
                    <option value={70}>70+ (Credit)</option>
                    <option value={50}>50+ Moderate</option>
                    <option value={30}>30+ High Risk</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-natural-muted uppercase tracking-widest">State</label>
                  <select 
                    className="w-full text-xs font-bold bg-natural-soft p-2 rounded-xl outline-none"
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                  >
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-natural-muted uppercase tracking-widest">Primary Crop</label>
                  <select 
                    className="w-full text-xs font-bold bg-natural-soft p-2 rounded-xl outline-none"
                    value={filterCrop}
                    onChange={(e) => setFilterCrop(e.target.value)}
                  >
                    {crops.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-natural-muted uppercase tracking-widest">Status</label>
                  <select 
                    className="w-full text-xs font-bold bg-natural-soft p-2 rounded-xl outline-none"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="divide-y divide-[#141414]/5 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredFarmers.map((farmer) => (
                <div 
                  key={farmer.id}
                  onClick={() => setSelectedFarmerId(farmer.id)}
                  className={cn(
                    "p-6 flex items-center justify-between cursor-pointer transition-colors",
                    selectedFarmerId === farmer.id ? "bg-[#4CAF50]/5" : "hover:bg-[#141414]/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                      farmer.trustScore >= 70 ? "bg-[#4CAF50]/10 text-[#4CAF50]" : "bg-amber-100 text-amber-600"
                    )}>
                      {farmer.trustScore}
                    </div>
                    <div>
                      <h4 className="font-bold">{farmer.name}</h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">{farmer.location.lga}, {farmer.location.state}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#141414]/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farmer Profile */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedFarmer ? (
              <motion.div 
                key={selectedFarmer.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white rounded-[3rem] border border-[#141414]/5 shadow-xl p-8 lg:p-12"
              >
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-[#141414]/5 rounded-[2.5rem] flex items-center justify-center text-[#141414]/20 text-4xl">
                      {selectedFarmer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-bold tracking-tight">{selectedFarmer.name}</h2>
                        {selectedFarmer.trustScore >= 70 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                            <Star size={12} fill="currentColor" />
                            Creditworthy
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#141414]/50">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {selectedFarmer.location.lga}, {selectedFarmer.location.state}</span>
                        <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#4CAF50]" /> Verified Profile</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> Enrolled {new Date(selectedFarmer.enrollmentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center md:items-end gap-3 p-8 bg-natural-soft rounded-[32px]">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-black/5" />
                          <circle 
                            cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" 
                            strokeDasharray={2 * Math.PI * 56}
                            strokeDashoffset={2 * Math.PI * 56 * (1 - selectedFarmer.trustScore / 100)}
                            className={cn(selectedFarmer.trustScore >= 70 ? "text-ag-green-dark" : "text-credit-gold", "transition-all duration-1000 ease-out")}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-3xl font-black text-natural-text">{selectedFarmer.trustScore}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-natural-muted">Trust Index</p>
                    </div>
                    
                    {/* QR Code Container */}
                    <div className="p-4 bg-white rounded-2xl border border-natural-border shadow-sm flex flex-col items-center gap-2">
                       <QRCodeCanvas 
                         value={`Farmer ID: ${selectedFarmer.id}\nStatus: ${selectedFarmer.verificationStatus}\nScore: ${selectedFarmer.trustScore}`}
                         size={80}
                         level="H"
                         includeMargin={false}
                       />
                       <p className="text-[8px] font-black uppercase tracking-widest text-natural-muted opacity-60">Scan to Verify ID</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 bg-[#4CAF50]/5 rounded-3xl border border-[#4CAF50]/10">
                    <TrendingUp size={24} className="text-[#4CAF50] mb-4" />
                    <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest mb-1">Primary Crop</p>
                    <p className="text-xl font-bold">{selectedFarmer.primaryCrop}</p>
                  </div>
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                    <Database size={24} className="text-blue-600 mb-4" />
                    <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest mb-1">Farm Size</p>
                    <p className="text-xl font-bold">{selectedFarmer.farmSize} Hectares</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100">
                    <ShieldCheck size={24} className="text-purple-600 mb-4" />
                    <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest mb-1">Insurance</p>
                    <p className="text-xl font-bold">{selectedFarmer.insuranceStatus ? "Protected" : "Uninsured"}</p>
                  </div>
                </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <ShieldCheck size={20} className="text-ag-green-dark" />
                        Verification History
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {farmerActivities.filter(a => a.type === 'verification').map((activity, i) => {
                        const agent = MOCK_AGENTS.find(agg => agg.id === activity.agentId);
                        return (
                          <div key={activity.id} className="p-5 bg-white rounded-2xl border border-natural-border shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-ag-green-dark/10 rounded-full flex items-center justify-center text-ag-green-dark">
                                <UserCheck size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-sm">Verified by {agent?.name || 'Authorized System Agent'}</p>
                                <p className="text-[10px] uppercase font-black tracking-widest text-natural-muted">
                                  {agent ? `Agent ID: ${agent.id} • ${agent.location}` : 'System Verification'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">{new Date(activity.date).toLocaleDateString()}</p>
                              <p className="text-[10px] font-medium text-natural-muted">Physical Audit</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <Clock size={20} className="text-[#141414]/40" />
                        Activity Timeline
                      </h3>
                    <button className="text-xs font-bold text-[#4CAF50] flex items-center gap-1 hover:underline">
                      <Download size={14} /> Full Report (PDF)
                    </button>
                  </div>
                  
                  <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#141414]/10">
                    {farmerActivities.length > 0 ? farmerActivities.map((activity, i) => (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-6 pl-8 relative"
                      >
                        <div className={cn(
                          "absolute left-[5.5px] top-2 w-[5px] h-[5px] rounded-full",
                          activity.type === 'verification' ? "bg-blue-500" : "bg-[#4CAF50]"
                        )} />
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="font-bold">{activity.description}</p>
                            <span className="text-[10px] font-bold text-[#4CAF50]">+{activity.points} pts</span>
                          </div>
                          <p className="text-xs text-[#141414]/40 font-medium">
                            {new Date(activity.date).toLocaleDateString()} • {activity.type.replace('_', ' ')}
                          </p>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-[#141414]/40 italic text-sm pl-8">No recent activities recorded.</div>
                    )}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#141414]/5 flex flex-wrap gap-4">
                  <button className="flex-1 min-w-[200px] bg-[#4CAF50] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4CAF50]/20 hover:scale-[1.02] transition-transform">
                    <CreditCard size={20} />
                    Request Loan Assessment
                  </button>
                  <button className="px-8 py-4 rounded-2xl border border-[#141414]/10 font-bold hover:bg-[#141414]/5 transition-colors">
                    Contact Agent
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3.5rem] border border-dashed border-[#141414]/10">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-200 mb-8 border border-blue-100">
                  <Search size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic opacity-30">Select a farmer to view detailed credit report</h3>
                <p className="text-[#141414]/30 max-w-sm leading-relaxed font-medium">
                  Use the directory on the left to browse and analyze farmer profiles. 
                  Real-time data synced from USSD and Agent portals.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
