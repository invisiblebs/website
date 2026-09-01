/**
 * Firestore-backed enquiry submission — core Firebase, no third-party form
 * relays. The SDK is imported dynamically so it costs nothing until someone
 * actually submits. Config comes from VITE_FIREBASE_* env vars (public by
 * design; security lives in firestore.rules: create-only, validated fields).
 */
const cfg = {
  apiKey: 'AIzaSyC3Z5gQ8G-5jNu7yOjoyy0I0jFCZ2VeZm8',
  authDomain: 'invisible-bits-web.firebaseapp.com',
  projectId: 'invisible-bits-web',
  appId: '1:432152106926:web:d1590072f2ef1dbd3b9a3f',
};

export const firebaseReady = Boolean(cfg.apiKey && cfg.projectId && cfg.appId);

export async function submitEnquiry(data: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<void> {
  if (!firebaseReady) throw new Error('firebase-unconfigured');
  const [{ initializeApp, getApps }, { getFirestore, addDoc, collection, serverTimestamp }] =
    await Promise.all([import('firebase/app'), import('firebase/firestore')]);
  const app = getApps()[0] ?? initializeApp(cfg);
  const db = getFirestore(app);
  await addDoc(collection(db, 'enquiries'), {
    ...data,
    createdAt: serverTimestamp(),
    page: window.location.pathname,
  });
}
