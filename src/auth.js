import { app } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInUser() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return { success: true, user };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

export async function signOutUser() {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

export function onAuthStateChange(callback) {
  onAuthStateChanged(auth, callback);
}
