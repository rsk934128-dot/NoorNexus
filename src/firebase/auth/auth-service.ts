
'use client';

import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup, 
  signOut, 
  Auth,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';

/**
 * @fileOverview Sovereign Identity Services (V4.5 - Seamless Handshake Edition)
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি প্রোফাইল এখন গিটহাব রিপোর্ট সিঙ্ক করার জন্য প্রয়োজনীয় পারমিশন বহন করবে।
 * সেশন পার্সিস্টেন্স আপডেট করা হয়েছে যাতে ইউজারকে বারবার লগইন করতে না হয়।
 */

export const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('openid');
  
  provider.setCustomParameters({
    prompt: 'select_account',
    access_type: 'offline',
  });

  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGithub = async (auth: Auth) => {
  const provider = new GithubAuthProvider();
  // Expanded Scopes for Project Reports & Repository Data
  provider.addScope('user:email');
  provider.addScope('read:user');
  provider.addScope('repo'); // Permission to read repository data
  
  // Custom parameters to make it seamless if already logged into GitHub
  provider.setCustomParameters({
    'allow_signup': 'false'
  });

  try {
    // Ensure the session stays active in the browser
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    // Note: To use the access token for GitHub API calls, you'd extract it from result.credential
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithMicrosoft = async (auth: Auth) => {
  const provider = new OAuthProvider('microsoft.com');
  provider.addScope('openid');
  provider.addScope('profile');
  provider.addScope('email');
  provider.addScope('offline_access');

  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (auth: Auth) => {
  try {
    await signOut(auth);
    // Clear local pulse memory on logout
    localStorage.removeItem('noornexus_last_pulse_provider');
  } catch (error) {
    throw error;
  }
};
