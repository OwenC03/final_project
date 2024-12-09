import "../styles/globals.css";
import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import ScenarioAdvice from "../components/ScenarioAdvice";
import CharacterCard from "../components/CharacterCard";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const AdvicePage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

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
        console.error("Error fetching characters:", err);
        setError("Failed to load characters. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [user]);

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteDoc(doc(db, "characters", characterId));
      setCharacters((prev) => prev.filter((char) => char.id !== characterId)); // Remove deleted character from state
      alert("Character deleted successfully!");
    } catch (err) {
      console.error("Error deleting character:", err);
      setError("Failed to delete character. Please try again.");
    }
  };

  if (loading) return <p>Loading Characters...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ProtectedRoute>
      <div>
        <button onClick={() => router.push("/home")} className="option-button">
          Back
        </button>
        <h1>Select a Character</h1>
        <div className="flex space-x-4">
          {characters.length > 0 ? (
            characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                onEdit={() => setSelectedCharacter(char)}
                onDelete={() => handleDeleteCharacter(char.id)}
                buttonLabels={{ edit: "Select", delete: "Delete" }}
              />
            ))
          ) : (
            <p>No characters found.</p>
          )}
        </div>
        <ScenarioAdvice character={selectedCharacter} />
      </div>
    </ProtectedRoute>
  );
};

export default AdvicePage;
