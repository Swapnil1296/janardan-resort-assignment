import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

const Auth = ({ user, setUser }) => {
    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            {user ? (
                <button
                    onClick={() => {
                        googleLogout();
                        setUser(null);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
                >
                    Logout
                </button>
            ) : (
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        setUser(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}
        </GoogleOAuthProvider>
    );
};

export default Auth;