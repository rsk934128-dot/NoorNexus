
'use client';

import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  Auth 
} from 'firebase/auth';

export const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signOutUser = async (auth: Auth) => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
