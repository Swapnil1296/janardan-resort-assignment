import React, { createContext, useContext, useEffect, useState } from 'react';


import { GoogleOAuthProvider } from '@react-oauth/google';

const AuthContext = createContext();

// Update the AuthProvider to include Google authentication
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginWithGoogle = async (credential) => {
        try {
            setLoading(true);
            setError(null);

            // Decode the credential to get user information
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${credential}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to get user info');
            }

            const userData = await response.json();

            const userObject = {
                id: userData.sub,
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                firstName: userData.given_name,
                lastName: userData.family_name
            };

            setUser(userObject);
            // Store the token in localStorage
            localStorage.setItem('auth_token', credential);
            return userObject;
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
            // Clear local storage
            localStorage.removeItem('auth_token');
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            loginWithGoogle(token).catch(console.error);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                loginWithGoogle,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);