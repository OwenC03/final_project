// pages/home.js
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if the user is not logged in
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    router.push("/login");
    return null; // Prevent rendering until redirect
  }

  return (
    <div className="home-container">
      <h1>Welcome, {user.email}</h1>
      <p>What would you like to do today?</p>
      <div className="options">
        <button onClick={() => router.push("/characters")} className="option-button">
          View Characters
        </button>
        <button onClick={() => router.push("/create-character")} className="option-button">
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
