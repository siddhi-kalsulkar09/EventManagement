import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/events/${id}/register`, {
        name,
        email,
        phone,
      });

      toast.success("Registration Successful ✅");

      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      <div className="bg-green-500 p-8 rounded-xl shadow-md w-96">

        {/* Back Button */}
        <Link
          to="/"
          className="text-blue-900 font-semibold mb-4 inline-block"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Event Registration
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Participant Name"
            className="input input-bordered w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered w-full mb-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full">
            Register
          </button>

        </form>

      </div>
    </div>
  );
};

export default RegisterPage;