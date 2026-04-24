import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, TrendingUp, AlertCircle, CheckCircle, Activity, CloudRain, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { insuranceService } from '../services/insuranceService';
import { CropHealthRecord } from '../constants';

interface InsuranceModuleProps {
  farmerId: string;
  isEnrolled: boolean;
  onEnroll: () => void;
  trustScore: number;
}

export default function InsuranceModule({ farmerId, isEnrolled, onEnroll, trustScore }: InsuranceModuleProps) {
  const [healthData, setHealthData] = useState<CropHealthRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isEnrolled) {
      insuranceService.getCropHealthHistory(farmerId).then(data => {
        if (data.length > 0) setHealthData(data[0]);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [farmerId, isEnrolled]);

  // Premium calculation: lower score = higher premium
  const basePremium = 25000;
  const riskFactor = 1 - (trustScore / 100);
  const premium = basePremium + (basePremium * riskFactor);

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#141414]/5 shadow-sm p-8 max-w-2xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Crop Insurance</h3>
            <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest">Sentinel Parametric</p>
          </div>
        </div>
        <div className={cn(
          "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border",
          isEnrolled ? "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20" : "bg-red-50 text-red-500 border-red-100"
        )}>
          {isEnrolled ? "Protected" : "Uninsured"}
        </div>
      </div>

      <div className="space-y-6">
        {isEnrolled && healthData && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-ag-green-dark text-white rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Activity size={80} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Live Sentinel Feed</p>
                <h4 className="text-lg font-bold">Crop Health Index</h4>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">
                <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse"></div>
                SYNCED
              </div>
            </div>
            
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black">{healthData.healthScore}%</span>
              <div className="pb-2">
                <p className="text-[10px] font-bold uppercase opacity-60">Status</p>
                <p className="font-bold text-sm">Optimal Growth</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-3">
                <CloudRain size={16} className="text-blue-300" />
                <div>
                  <p className="text-[8px] font-bold opacity-60 uppercase">Rainfall</p>
                  <p className="text-xs font-bold">{healthData.climateData.rainfall}mm</p>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl flex items-center gap-3">
                <Zap size={16} className="text-amber-300" />
                <div>
                  <p className="text-[8px] font-bold opacity-60 uppercase">Risk Level</p>
                  <p className="text-xs font-bold capitalize">{healthData.climateData.riskLevel}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="p-6 bg-[#141414]/5 rounded-3xl space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-[#141414]/60">Annual Premium</span>
            <span className="font-bold">₦{premium.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-[#141414]/60">Trust Score Discount</span>
            <span className="font-bold text-[#4CAF50]">-{trustScore}%</span>
          </div>
          <div className="h-px bg-[#141414]/10"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Final Premium (at Harvest)</span>
            <span className="text-xl font-bold">₦{(premium * (1 - trustScore/100)).toLocaleString()}</span>
          </div>
        </div>

        {!isEnrolled ? (
          <button 
            onClick={onEnroll}
            className="w-full bg-[#4CAF50] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#4CAF50]/20 hover:scale-[1.01] transition-transform"
          >
            <Shield size={20} />
            Enroll with Pay-at-Harvest (+15 Trust Pts)
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
              <Zap size={18} className="text-blue-600 mt-1" />
              <div>
                <p className="text-xs font-bold text-blue-900">Parametric Trigger Active</p>
                <p className="text-[10px] text-blue-700">Instant payout will be triggered if rainfall drops below 40mm for 10 consecutive days.</p>
              </div>
            </div>
            <div className="p-4 bg-[#4CAF50]/10 rounded-2xl border border-[#4CAF50]/20 flex items-center gap-4 text-[#4CAF50]">
              <CheckCircle size={24} />
              <div>
                <p className="text-sm font-bold">Policy Active</p>
                <p className="text-[10px] opacity-80">2026 Planting Season Covered</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-[10px] text-[#141414]/30 font-medium justify-center uppercase tracking-widest">
          <AlertCircle size={12} />
          Verified by Sentinel-Ground Sync
        </div>
      </div>
    </div>
  );
}
