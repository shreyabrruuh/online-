import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulating a delay to mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulating a successful password reset request
      console.log("Password reset request for:", email);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Failed to process request. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h4 className="text-xl font-semibold mb-4">Forgot Password</h4>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;