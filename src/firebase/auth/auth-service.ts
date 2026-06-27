
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
 * @fileOverview Sovereign Identity Services (V4.2 - GitHub Reports Sync)
 * নূরনেক্সাস সাম্রাজ্যের প্রতিটি প্রোফাইল এখন গিটহাব রিপোর্ট সিঙ্ক করার জন্য প্রয়োজনীয় পারমিশন বহন করবে।
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
  
  try {
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
