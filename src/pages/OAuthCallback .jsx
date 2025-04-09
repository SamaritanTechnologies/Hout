// src/components/Auth/OAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux";
import { toast } from "react-toastify";
import { setAccessToken, setRefreshToken } from "../providers";

export const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("oauth-callback");
    const token = searchParams.get("token");
    const userId = searchParams.get("user_id");
    const cartId = searchParams.get("cart_id");

    if (token && userId) {
      try {
        // Store tokens
        setAccessToken(token);
        // Note: If you have refresh token, add it here
        // setRefreshToken(refreshToken);

        // Dispatch user login (you might need to fetch user details first)
        dispatch(
          loginUser({
            id: userId,
            // Add other user details if available in URL or fetch them
          })
        );

        // Optional: Store cart ID if needed
        if (cartId) {
          localStorage.setItem("cart_id", cartId);
        }

        // Redirect to appropriate page
        navigate("/"); // or dashboard if admin

        // Clean URL (remove token from address bar)
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        toast.error("Login failed");
        console.error("OAuth callback error:", error);
        navigate("/login");
      }
    } else {
      // No token received - OAuth failed
      toast.error("Login failed - no token received");
      navigate("/login");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing login...</h2>
        <p>Please wait while we authenticate your account.</p>
      </div>
    </div>
  );
};
