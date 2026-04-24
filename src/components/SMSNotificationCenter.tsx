import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Bell, UserCheck, Shield, Send, Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_FARMERS } from '../mockData';

interface SMSMessage {
  id: string;
  recipient: string;
  content: string;
  timestamp: string;
  type: 'enrollment' | 'verification' | 'insurance' | 'credit';
}

const SMS_DATA: SMSMessage[] = [
  {
    id: 'msg-1',
    recipient: '0801***5678 (Peter)',
    type: 'enrollment',
    content: 'Welcome to AgricSmart! Your ID is AS-2023-8941. An agent will visit your farm soon for verification. Keep farming!',
    timestamp: '2 mins ago'
  },
  {
    id: 'msg-2',
    recipient: '0801***5678 (Peter)',
    type: 'verification',
    content: 'CONGRATULATIONS Peter! Your farm in Karu has been verified. Your Trust Score is now 30. You are now eligible for basic insurance.',
    timestamp: '1 hour ago'
  },
  {
    id: 'msg-3',
    recipient: '0801***5678 (Peter)',
    type: 'insurance',
    content: 'REMINDER: Your 2026 Maize Policy is active. Premium will be deducted upon harvest sale. Your protection is guaranteed.',
    timestamp: 'Yesterday'
  }
];

export default function SMSNotificationCenter() {
  const [messages, setMessages] = useState<SMSMessage[]>(SMS_DATA);
  const [showTrigger, setShowTrigger] = useState(false);
  const [newMsg, setNewMsg] = useState({
    recipient: '',
    content: '',
    type: 'enrollment' as SMSMessage['type']
  });

  const handleFarmerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const farmer = MOCK_FARMERS.find(f => f.id === e.target.value);
    if (farmer) {
      setNewMsg({
        ...newMsg,
        recipient: `${farmer.id} (${farmer.name})`,
        content: `Hello ${farmer.name}, your Agricultural Trust Index has been updated...`
      });
    }
  };

  const handleSend = () => {
    if (!newMsg.recipient || !newMsg.content) return;
    
    const msg: SMSMessage = {
      id: `msg-${Date.now()}`,
      recipient: newMsg.recipient,
      content: newMsg.content,
      type: newMsg.type,
      timestamp: 'Just now'
    };
    
    setMessages([msg, ...messages]);
    setShowTrigger(false);
    setNewMsg({ recipient: '', content: '', type: 'enrollment' });
  };

  return (
    <div className="bg-white rounded-[32px] border border-natural-border shadow-sm p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-natural-muted flex items-center gap-2">
          <MessageSquare size={16} />
          SMS Stream (Simulated)
        </h3>
        <button 
          onClick={() => setShowTrigger(!showTrigger)}
          className="p-2 bg-ag-green-dark text-white rounded-xl hover:scale-105 transition-transform"
        >
          {showTrigger ? <X size={16} /> : <Plus size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {showTrigger && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6 space-y-3"
          >
            <div className="p-4 bg-natural-soft rounded-2xl border border-natural-border space-y-3">
              <select 
                className="w-full bg-white px-3 py-2 rounded-xl text-xs outline-none border border-natural-border"
                onChange={handleFarmerSelect}
              >
                <option value="">Select Recipient Farmer...</option>
                {MOCK_FARMERS.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.id})</option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder="Recipient Phone or ID..."
                className="w-full bg-white px-3 py-2 rounded-xl text-xs outline-none border border-natural-border focus:border-ag-green"
                value={newMsg.recipient}
                onChange={e => setNewMsg({...newMsg, recipient: e.target.value})}
              />
              <select 
                className="w-full bg-white px-3 py-2 rounded-xl text-xs outline-none border border-natural-border"
                value={newMsg.type}
                onChange={e => setNewMsg({...newMsg, type: e.target.value as any})}
              >
                <option value="enrollment">Enrollment Conf.</option>
                <option value="verification">Verification Update</option>
                <option value="insurance">Insurance Reminder</option>
                <option value="credit">Credit Alert</option>
              </select>
              <textarea 
                placeholder="Message Content..."
                className="w-full bg-white px-3 py-2 rounded-xl text-xs outline-none border border-natural-border focus:border-ag-green min-h-[80px]"
                value={newMsg.content}
                onChange={e => setNewMsg({...newMsg, content: e.target.value})}
              />
              <button 
                onClick={handleSend}
                className="w-full py-3 bg-ag-green-dark text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Simulation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-natural-soft border border-natural-border relative group overflow-hidden"
          >
             <div className="flex items-start gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.type === 'enrollment' ? "bg-ag-green/10 text-ag-green" :
                  msg.type === 'verification' ? "bg-trust-blue/10 text-trust-blue" :
                  "bg-credit-gold/10 text-credit-gold"
                )}>
                  {msg.type === 'enrollment' && <Bell size={14} />}
                  {msg.type === 'verification' && <UserCheck size={14} />}
                  {msg.type === 'insurance' && <Shield size={14} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-black text-natural-muted uppercase tracking-wider">{msg.recipient}</p>
                    <p className="text-[8px] font-bold text-natural-muted/60">{msg.timestamp}</p>
                  </div>
                  <p className="text-xs font-medium text-natural-text leading-relaxed">
                    {msg.content}
                  </p>
                </div>
             </div>
             <div className="absolute right-0 top-0 bottom-0 w-1 bg-ag-green opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 rounded-2xl border border-dashed border-natural-border text-[10px] font-black text-natural-muted hover:bg-natural-soft transition-colors uppercase tracking-widest">
        View Message Logs
      </button>
    </div>
  );
}
