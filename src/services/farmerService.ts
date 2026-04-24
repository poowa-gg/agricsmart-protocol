import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  addDoc,
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../firebase';
import { FarmerProfile, TrustActivity, Agent } from '../constants';
import { MOCK_FARMERS, MOCK_ACTIVITIES, MOCK_AGENTS } from '../mockData';

export const farmerService = {
  async getAllFarmers(): Promise<FarmerProfile[]> {
    const snapshot = await getDocs(collection(db, 'farmers'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FarmerProfile));
  },

  async enrollFarmer(data: Partial<FarmerProfile>) {
    const farmerRef = doc(collection(db, 'farmers'));
    const farmer = {
      ...data,
      id: farmerRef.id,
      trustScore: 0,
      verificationStatus: 'pending',
      enrollmentDate: new Date().toISOString(),
      insuranceStatus: false,
      isCreditworthy: false
    };
    await setDoc(farmerRef, farmer);
    return farmer;
  },

  async verifyFarmer(farmerId: string, agentId: string) {
    const farmerRef = doc(db, 'farmers', farmerId);
    await updateDoc(farmerRef, {
      verificationStatus: 'verified',
      agentId: agentId,
      trustScore: increment(30)
    });

    await addDoc(collection(db, 'activities'), {
      farmerId,
      type: 'verification',
      points: 30,
      date: new Date().toISOString(),
      description: 'Physical farm verification completed by local agent.'
    });
  },

  async seedDatabase() {
    // Seed mock data to Firebase
    for (const farmer of MOCK_FARMERS) {
      await setDoc(doc(db, 'farmers', farmer.id), farmer);
    }
    for (const activity of MOCK_ACTIVITIES) {
      await setDoc(doc(db, 'activities', activity.id), activity);
    }
    for (const agent of MOCK_AGENTS) {
      await setDoc(doc(db, 'agents', agent.id), agent);
    }
  }
};
