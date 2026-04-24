export const NIGERIAN_STATES = [
  "Adamawa", "Anambra", "Bauchi", "Benue", "Borno", "Cross River", "Delta", 
  "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", 
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", 
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

export const CROPS = [
  "Cassava", "Maize", "Yam", "Rice", "Sorghum", "Cowpea", "Soybean", "Cocoa", "Oil Palm", "Ginger"
];

export const LGAS_BY_STATE: Record<string, string[]> = {
  "Nasarawa": ["Karu", "Lafia", "Keffi", "Akwanga", "Toto"],
  "Kaduna": ["Kaduna North", "Kaduna South", "Zaria", "Kachia"],
  "Kano": ["Kano Municipal", "Fagge", "Dala", "Gwale"],
  // Add more as needed for the prototype
};

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface FarmerProfile {
  id: string;
  phone: string;
  name: string;
  location: {
    state: string;
    lga: string;
    coordinates?: { lat: number; lng: number };
  };
  farmSize: number;
  primaryCrop: string;
  trustScore: number;
  enrollmentDate: string;
  verificationStatus: VerificationStatus;
  agentId?: string;
  insuranceStatus: boolean;
  isCreditworthy: boolean;
}

export interface TrustActivity {
  id: string;
  farmerId: string;
  type: 'verification' | 'input_purchase' | 'harvest_sale' | 'insurance' | 'milestone';
  points: number;
  date: string;
  description: string;
  agentId?: string;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  location: string;
  earnings: number;
  farmersVerifiedCount: number;
}
