// pages/index.js
import "../styles/globals.css";
import { useRouter } from 'next/router';

const LandingPage = () => {
  const router = useRouter();

  // Redirect the user to the login page
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  // Redirect the user to the register page
  const handleRegisterClick = () => {
    router.push('/auth/register');
  };

  return (
    <div className="landing-page">
      <h1>Welcome to the D&D Character Manager</h1>
      <p>Choose an option below to get started:</p>
      <div className="buttons">
        <button onClick={handleLoginClick} className="button">Log In</button>
        <button onClick={handleRegisterClick} className="button">Create Account</button>
      </div>
    </div>
  );
};

export default LandingPage;
