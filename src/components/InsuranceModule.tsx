import React from 'react';
import { motion } from 'motion/react';
import { Shield, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface InsuranceModuleProps {
  farmerId: string;
  isEnrolled: boolean;
  onEnroll: () => void;
  trustScore: number;
}

export default function InsuranceModule({ farmerId, isEnrolled, onEnroll, trustScore }: InsuranceModuleProps) {
  // Premium calculation: lower score = higher premium
  const basePremium = 25000;
  const riskFactor = 1 - (trustScore / 100);
  const premium = basePremium + (basePremium * riskFactor);

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#141414]/5 shadow-sm p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Crop Insurance</h3>
            <p className="text-xs font-bold text-[#141414]/40 uppercase tracking-widest">Multi-peril coverage</p>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border border-[#141414]/5 flex items-start gap-3">
            <CheckCircle size={16} className="text-[#4CAF50] mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-tight">Drought</p>
              <p className="text-[10px] text-[#141414]/40">Full coverage</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-[#141414]/5 flex items-start gap-3">
            <CheckCircle size={16} className="text-[#4CAF50] mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-tight">Pest Infestation</p>
              <p className="text-[10px] text-[#141414]/40">Partial coverage</p>
            </div>
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
          <div className="p-6 bg-[#4CAF50]/10 rounded-3xl border border-[#4CAF50]/20 flex items-center gap-4 text-[#4CAF50]">
            <CheckCircle size={32} />
            <div>
              <p className="font-bold">Policy Active</p>
              <p className="text-xs opacity-80">You are covered for the 2026 planting season.</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-[10px] text-[#141414]/30 font-medium justify-center uppercase tracking-widest">
          <AlertCircle size={12} />
          Premiums are automatically deducted from harvest sales
        </div>
      </div>
    </div>
  );
}
