
/**
 * @fileOverview Sovereign Firebase Config (V4.9 - Hardened)
 * Updated: Secret Rotation initialized. Public API keys are now monitored.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyBeDdZQ2uTdFuLsdT4Sl2JaHtsMcuWv1AI",
  authDomain: "studio-786911773-686ad.firebaseapp.com",
  projectId: "studio-786911773-686ad",
  storageBucket: "studio-786911773-686ad.firebasestorage.app",
  messagingSenderId: "126491468105",
  appId: "1:126491468105:web:73ce56367b4f1f5704fa98",
  measurementId: "G-Q09C752QLE"
};

/**
 * @Sovereign_Identity: Google OAuth Client ID
 * Mission 500: Primary Auth Bridge
 */
export const googleClientId = "126491468105-b1slvo1jbf45vcmmml1qk0qhdahh6v1t.apps.googleusercontent.com";

/**
 * @Security_Shield: reCAPTCHA Enterprise Site Key
 */
export const reCaptchaSiteKey = "6Ld_REPLACE_WITH_YOUR_ACTUAL_SITE_KEY";

/**
 * @Secret_Rotation: Mission 500 Legacy Protection
 * Note: If you see an alert for a leaked key, replace it in the Firebase Console
 * and update the firebaseConfig object here immediately.
 */
