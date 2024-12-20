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
  const [advice, setAdvice] = useState("");
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

  const fetchAdvice = async (characterClass) => {
    if (!characterClass) return;

    try {
      const response = await fetch(
        `https://api.open5e.com/classes/?name=${encodeURIComponent(characterClass)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch advice from Open5e API.");
      }
      const data = await response.json();
      const adviceData = data.results?.[0]?.desc || "No specific advice available.";
      setAdvice(adviceData);
    } catch (err) {
      console.error("Error fetching advice:", err);
      setAdvice("Failed to fetch advice. Please try again later.");
    }
  };

  useEffect(() => {
    if (selectedCharacter) {
      fetchAdvice(selectedCharacter.characterClass);
    }
  }, [selectedCharacter]);

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
        {selectedCharacter && (
          <div>
            <h2>Advice for {selectedCharacter.name}</h2>
            <p>{advice}</p>
          </div>
        )}
        <ScenarioAdvice character={selectedCharacter} />
      </div>
    </ProtectedRoute>
  );
};

export default AdvicePage;
