
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
 * @fileOverview Sovereign Identity Services (V4)
 * Supports Google, GitHub, and Microsoft (Imperial Identity Mesh).
 */

export const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGithub = async (auth: Auth) => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithMicrosoft = async (auth: Auth) => {
  const provider = new OAuthProvider('microsoft.com');
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
