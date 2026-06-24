import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newpassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
console.log(token)
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resetPassword/${token}`,
        {
          newpassword,
        }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Reset Password</h2>

      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-[100%] p-[10px] mb-[15px]"
            
        />

        <button
          type="submit"
          disabled={loading}
          className="w-[100%] p-[10px] cursor-pointer"

          
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Reset