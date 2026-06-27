
'use client';

import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup, 
  signOut, 
  Auth 
} from 'firebase/auth';

/**
 * @fileOverview Sovereign Identity Services (V4.2 - System Level Permissions)
 * Supports Google, GitHub, and Microsoft with full OAuth scope synchronization.
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি প্রোফাইল এখন জেমিনি এআই-এর সাথে কাজ করার জন্য প্রয়োজনীয় পারমিশন বহন করবে।
 */

export const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  
  // Adding specific scopes for System-Level Access
  provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  provider.addScope('openid');
  
  // Custom Parameters for Background Execution Handshake
  provider.setCustomParameters({
    prompt: 'select_account',
    access_type: 'offline', // Ensures long-lived refresh tokens
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGithub = async (auth: Auth) => {
  const provider = new GithubAuthProvider();
  provider.addScope('user:email');
  provider.addScope('read:user');
  
  try {
    const result = await signInWithPopup(auth, provider);
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
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
