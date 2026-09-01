import { create } from 'zustand';

/** Carries a clicked service into the contact form as its pre-selected topic. */
type EnquiryState = {
  topic: string | null;
  setTopic: (topic: string | null) => void;
};

export const useEnquiry = create<EnquiryState>((set) => ({
  topic: null,
  setTopic: (topic) => set({ topic }),
}));
