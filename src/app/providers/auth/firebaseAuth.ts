import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";
import { auth } from "shared/lib/firebase/firebase.ts";
import type { User } from "firebase/auth";

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const firebaseSignOut = () => signOut(auth);

export const onAuthChanged = (cb: (user: User | null) => void) => onAuthStateChanged(auth, cb);

export const getCurrentUserToken = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  return await getIdToken(user);
};
