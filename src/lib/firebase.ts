/**
 * Firestore-backed enquiry submission — core Firebase, no third-party relays.
 *
 * The SDK is imported dynamically so it costs nothing until someone actually
 * submits. The config below is a public Firebase web config, not a secret:
 * it ships inside the client bundle of every Firebase web app by design.
 * Access is enforced by firestore.rules (create-only, shape-validated, reads
 * denied) and the API key is restricted to this site's domains.
 *
 * App Check (reCAPTCHA Enterprise) attests that requests come from the real
 * site before Firestore accepts them, which is what stops automated spam.
 */
const cfg = {
  apiKey: 'AIzaSyC3Z5gQ8G-5jNu7yOjoyy0I0jFCZ2VeZm8',
  authDomain: 'invisible-bits-web.firebaseapp.com',
  projectId: 'invisible-bits-web',
  appId: '1:432152106926:web:d1590072f2ef1dbd3b9a3f',
};

const RECAPTCHA_SITE_KEY = '6LcB4aItAAAAAGCWuRsiCQgxldU02j85iZwEqtzd';

export async function submitEnquiry(data: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<void> {
  const [{ initializeApp, getApps }, appCheckMod, { getFirestore, addDoc, collection, serverTimestamp }] =
    await Promise.all([
      import('firebase/app'),
      import('firebase/app-check'),
      import('firebase/firestore'),
    ]);

  const existing = getApps()[0];
  const app = existing ?? initializeApp(cfg);

  // Initialise App Check once per app instance; a repeat call would throw.
  if (!existing) {
    const { initializeAppCheck, ReCaptchaEnterpriseProvider } = appCheckMod;
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  }

  const db = getFirestore(app);
  await addDoc(collection(db, 'enquiries'), {
    ...data,
    createdAt: serverTimestamp(),
    page: window.location.pathname,
  });
}
