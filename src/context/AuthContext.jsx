import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "./firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginWithEmailPassword = async (email, password) => {
        try {
            setLoading(true);
            setError(null);





            const userData = { email, password }
            // Store in localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            return userData;

        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            setError(null);

            const userCredential = await signInWithPopup(auth, provider);
            const loggedInUser = userCredential.user;

            const userData = {
                id: loggedInUser.uid,
                email: loggedInUser.email,
                name: loggedInUser.displayName,
                picture: loggedInUser.photoURL,
            };
            localStorage.setItem("user", JSON.stringify(userData)); // Store in localStorage

            setUser(userData);
            return userData;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            localStorage.removeItem("user"); 
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    id: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                    picture: firebaseUser.photoURL,
                };
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            } else {
                setUser(null);
            }
        });

        return unsubscribe; 
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                loginWithEmailPassword,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
