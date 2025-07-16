import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { registerUser, btnLoading } = useUserData();

  async function submitHandler(e: any) {
    e.preventDefault();

    registerUser(name, email, password, navigate);
  }
  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src="/musician.png"
            alt="Musician Logo"
            className="h-60 w-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center mb-8">
          Register To Musician
        </h2>
        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="enter your name.."
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="enter your email.."
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="enter your password.."
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button disabled={btnLoading} className="auth-btn">
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          Already have an Account?&nbsp;
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-gray-300 underline"
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;