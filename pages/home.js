// pages/home.js
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import "../styles/globals.css";

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if the user is not logged in
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push("/auth/login");
    return null; // Prevent rendering until redirect
  }

  return (
    <div className="home-container">
      <h1>Welcome, {user.name}</h1>
      <p>What would you like to do today?</p>
      <div className="options">
        <button onClick={() => router.push("/characters")} className="option-button">
          View Characters
        </button>
        <button onClick={() => router.push("/createCharacters")} className="option-button">
          Create New Character
        </button>
        <button onClick={() => router.push("/advice")} className="option-button">
          Get Scenario Advice
        </button>
      </div>
    </div>
  );
};

export default HomePage;
