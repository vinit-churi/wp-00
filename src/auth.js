import { app } from "./firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addUserToFirestore } from "./firestore";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInUser() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    addUserToFirestore(user);
    // console.log(user);
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
  return onAuthStateChanged(auth, callback);
}
