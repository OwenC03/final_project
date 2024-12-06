import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/login"); // Redirect to login if not authenticated
      } else {
        setIsLoading(false); // Authentication confirmed
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading indicator while checking authentication
  }

  return children;
};

export default ProtectedRoute;
