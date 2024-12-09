import "../styles/globals.css";
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
  const [formData, setFormData] = useState({}); // Track the form data
  const router = useRouter();

  const handleCharacterSubmit = async (character) => {
    if (!user) return;

    // Validation: Ensure that necessary character data is provided
    if (!character.name || !character.race || !character.characterClass) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);  // Start loading
    setError(null);  // Reset error state

    try {
      const newCharacter = { ...character, userId: user.uid };
      await addDoc(collection(db, "characters"), newCharacter);
      alert("Character created successfully!");
      setFormData({}); // Clear the form data
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
        <button onClick={() => router.push("/home")} className="option-button">Back</button>
        <h1>Create a New Character</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
        <CharacterForm 
          onSubmit={handleCharacterSubmit} 
          formData={formData} 
          setFormData={setFormData} 
        />
        {loading && <p>Creating your character...</p>}  {/* Show loading state */}
      </div>
    </ProtectedRoute>
  );
};

export default CreateCharacter;
