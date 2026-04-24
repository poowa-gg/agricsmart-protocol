import { GoogleGenerativeAI } from '@google/genai';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  limit,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore';
import { db } from '../firebase';
import { CropHealthRecord, InsuranceClaim } from '../constants';
import { MOCK_CROP_HEALTH, MOCK_INSURANCE_CLAIMS } from '../mockData';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const insuranceService = {
  async getCropHealthHistory(farmerId: string): Promise<CropHealthRecord[]> {
    try {
      const q = query(
        collection(db, 'cropHealth'),
        where('farmerId', '==', farmerId),
        orderBy('date', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return MOCK_CROP_HEALTH.filter(h => h.farmerId === farmerId);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CropHealthRecord));
    } catch (e) {
      console.error("Error fetching crop health:", e);
      return MOCK_CROP_HEALTH.filter(h => h.farmerId === farmerId);
    }
  },

  async analyzeCropHealth(farmerId: string, photoBase64: string): Promise<Partial<CropHealthRecord>> {
    // In a real app, we'd send the image to Gemini
    // For this prototype, we'll simulate the AI analysis logic
    
    // If no API key, use fallback simulation
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      return this.simulateAIAnalysis(farmerId);
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Analyze this crop photo for health indicators. Return a JSON with healthScore (0-100), insights (array of strings), and riskLevel (low/moderate/high/critical).";
      
      // Simulate response for now to ensure stability
      return this.simulateAIAnalysis(farmerId);
    } catch (e) {
      return this.simulateAIAnalysis(farmerId);
    }
  },

  simulateAIAnalysis(farmerId: string): Partial<CropHealthRecord> {
    const scores = [85, 92, 78, 88, 95];
    const score = scores[Math.floor(Math.random() * scores.length)];
    
    return {
      farmerId,
      date: new Date().toISOString(),
      healthScore: score,
      insights: [
        score > 90 ? 'Excellent leaf turgor' : 'Minor leaf curling detected',
        'Chlorophyll levels within normal range',
        'No visible pest infestation'
      ],
      climateData: {
        rainfall: 45 + Math.random() * 20,
        temperature: 28 + Math.random() * 5,
        riskLevel: score > 80 ? 'low' : 'moderate'
      }
    };
  },

  async recordCropHealth(record: Partial<CropHealthRecord>) {
    const docRef = await addDoc(collection(db, 'cropHealth'), {
      ...record,
      timestamp: new Date()
    });

    // If health is critical and rainfall is low, trigger parametric payout
    if (record.healthScore && record.healthScore < 70 && record.climateData?.riskLevel === 'critical') {
      await this.triggerParametricPayout(record.farmerId!, 25000, "Severe drought detected via Sentinel-Ground Sync");
    }

    return docRef.id;
  },

  async triggerParametricPayout(farmerId: string, amount: number, reason: string) {
    const claim: Partial<InsuranceClaim> = {
      farmerId,
      amount,
      date: new Date().toISOString(),
      type: 'parametric',
      status: 'processed',
      triggerReason: reason
    };

    await addDoc(collection(db, 'insurance_claims'), claim);
    
    // Also notify farmer via activity
    await addDoc(collection(db, 'activities'), {
      farmerId,
      type: 'insurance',
      points: 5,
      date: new Date().toISOString(),
      description: `Parametric Payout of ₦${amount.toLocaleString()} processed: ${reason}`
    });

    // Update farmer trust score (insurance payouts can improve liquidity and thus trust)
    const farmerRef = doc(db, 'farmers', farmerId);
    await updateDoc(farmerRef, {
      trustScore: increment(5)
    });
  }
};
