import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";

const LoginPage = () => {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/home");  // Redirect to the characters page if logged in
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
