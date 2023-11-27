import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebase";
const db = getFirestore(app);

export async function addUserToFirestore(user) {
  try {
    // Check if the user already exists in the "users" collection
    const usersQuery = query(
      collection(db, "users"),
      where("uid", "==", user.uid)
    );
    const usersSnapshot = await getDocs(usersQuery);

    if (usersSnapshot.size === 0) {
      // User does not exist, so add the new user
      const docRef = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      console.log("Document written with ID: ", docRef.id);
      return { success: true };
    } else {
      // User already exists, do not add again
      console.log("User with UID already exists");
      return { success: true }; // You may consider returning some information or status
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
}

export async function getUsers(callback) {
  const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log(users);
    callback(users);
  });
  return () => unsubscribe();
  //   const unsubscribe = onSnapshot(doc(db, "users"), (doc) => {
  //     console.log("Current data: ", doc.data());
  //     console.log(callback);
  //   });
  // return unsubscribe;
  //   const users = [];
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     users.push(doc.data());
  //   });
  //   return users;
}
