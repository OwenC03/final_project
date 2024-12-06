import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import CharacterForm from "../components/CharacterForm";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const CreateCharacter = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);  // State to track the loading status
  const [error, setError] = useState(null);  // State to track error
  const router = useRouter();

  const handleCharacterSubmit = async (character) => {
    if (!user) return;

    setLoading(true);  // Start loading
    setError(null);  // Reset error state

    try {
      const newCharacter = { ...character, userId: user.uid };
      await addDoc(collection(db, "characters"), newCharacter);
      alert("Character created successfully!");
      router.push("/characters");  // Redirect to the characters page after creation
    } catch (err) {
      setError("Failed to create character. Please try again.");
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Create a New Character</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
        <CharacterForm onSubmit={handleCharacterSubmit} />
        {loading && <p>Creating your character...</p>}  {/* Show loading state */}
      </div>
    </ProtectedRoute>
  );
};

export default CreateCharacter;
