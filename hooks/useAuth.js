import { useState, useEffect } from "react";
import { auth } from "../utils/firebase";  // Firebase auth configuration
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);  // State to track the authenticated user
  const [loading, setLoading] = useState(true);  // State to track if authentication is in progress

  // Initialize Firebase Auth and listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Set the user state when authentication state changes
      setLoading(false);  // Set loading to false once auth state is determined
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  // Function to handle sign-in
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  // Function to handle sign-out
  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut: signOutUser,
  };
};

export { useAuth };
