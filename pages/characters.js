import ProtectedRoute from "../components/ProtectedRoute";
import CharacterCard from "../components/CharacterCard";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "characters"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const chars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCharacters(chars);
      } catch (err) {
        setError("Failed to load characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [user]);

  if (loading) {
    return <p>Loading characters...</p>; // Show loading state
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Your Characters</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
        {characters.length > 0 ? (
          characters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))
        ) : (
          <p>No characters found.</p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Characters;
