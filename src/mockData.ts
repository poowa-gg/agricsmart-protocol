import { FarmerProfile, TrustActivity, Agent, CropHealthRecord, InsuranceClaim } from './constants';
import { subDays, formatISO } from 'date-fns';

export const MOCK_FARMERS: FarmerProfile[] = [
  // ... existing farmers
  {
    id: 'F-001',
    name: 'Peter Okeke',
    phone: '08012345678',
    location: { state: 'Nasarawa', lga: 'Karu', coordinates: { lat: 8.995, lng: 7.585 } },
    farmSize: 2.5,
    primaryCrop: 'Maize',
    trustScore: 80,
    enrollmentDate: formatISO(subDays(new Date(), 95)),
    verificationStatus: 'verified',
    insuranceStatus: true,
    isCreditworthy: true,
  },
  {
    id: 'F-002',
    name: 'Sani Adamu',
    phone: '08023456789',
    location: { state: 'Kano', lga: 'Fagge' },
    farmSize: 5.0,
    primaryCrop: 'Rice',
    trustScore: 35,
    enrollmentDate: formatISO(subDays(new Date(), 10)),
    verificationStatus: 'pending',
    insuranceStatus: false,
    isCreditworthy: false,
  },
  {
    id: 'F-003',
    name: 'Blessing Adebayo',
    phone: '08034567890',
    location: { state: 'Lagos', lga: 'Ikorodu' },
    farmSize: 1.2,
    primaryCrop: 'Cassava',
    trustScore: 65,
    enrollmentDate: formatISO(subDays(new Date(), 45)),
    verificationStatus: 'verified',
    insuranceStatus: true,
    isCreditworthy: false,
  },
];

export const MOCK_ACTIVITIES: TrustActivity[] = [
  {
    id: 'A-001',
    farmerId: 'F-001',
    type: 'verification',
    points: 30,
    date: formatISO(subDays(new Date(), 90)),
    description: 'Initial physical farm verification',
    agentId: 'AG-1'
  },
  {
    id: 'A-002',
    farmerId: 'F-001',
    type: 'input_purchase',
    points: 5,
    date: formatISO(subDays(new Date(), 80)),
    description: 'Purchased 5 bags of Fertilizer (NPK 20-10-10)'
  },
  {
    id: 'A-003',
    farmerId: 'F-001',
    type: 'insurance',
    points: 15,
    date: formatISO(subDays(new Date(), 70)),
    description: 'Enrolled in Crop Insurance'
  },
  {
    id: 'A-004',
    farmerId: 'F-001',
    type: 'harvest_sale',
    points: 10,
    date: formatISO(subDays(new Date(), 10)),
    description: 'Sold 2 tons of Maize to Katsir Farms'
  },
  {
    id: 'A-005',
    farmerId: 'F-001',
    type: 'milestone',
    points: 20,
    date: formatISO(new Date()),
    description: '90 Days active milestone reached'
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'AG-1',
    name: 'Josephine Uche',
    phone: '09012345678',
    location: 'Karu, Nasarawa',
    earnings: 25500,
    farmersVerifiedCount: 51
  }
];

export const MOCK_CROP_HEALTH: CropHealthRecord[] = [
  {
    id: 'CH-001',
    farmerId: 'F-001',
    date: formatISO(subDays(new Date(), 5)),
    healthScore: 92,
    insights: ['Strong vegetative growth', 'Optimum chlorophyll levels'],
    climateData: {
      rainfall: 120,
      temperature: 28,
      riskLevel: 'low'
    }
  },
  {
    id: 'CH-002',
    farmerId: 'F-001',
    date: formatISO(new Date()),
    healthScore: 88,
    insights: ['Slight water stress detected', 'Rainfall below 7-day average'],
    climateData: {
      rainfall: 45,
      temperature: 32,
      riskLevel: 'moderate'
    }
  }
];

export const MOCK_INSURANCE_CLAIMS: InsuranceClaim[] = [
  {
    id: 'IC-001',
    farmerId: 'F-001',
    date: formatISO(subDays(new Date(), 60)),
    amount: 15000,
    type: 'parametric',
    status: 'processed',
    triggerReason: 'Low rainfall index (Dry spell > 10 days)'
  }
];
