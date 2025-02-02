import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const { setUser, loading, error, loginWithEmailPassword, loginWithGoogle } = useAuth();  
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await loginWithEmailPassword(email, password);
            if (user) {
                onClose();
            }
        } catch (err) {
            toast.error("Invalid email or password");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            onClose();
        } catch (err) {
            toast.error("Google login failed: " + err.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-4 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        {/* Google icon here */}
                    </svg>
                    Continue with Google
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <div className="mt-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
