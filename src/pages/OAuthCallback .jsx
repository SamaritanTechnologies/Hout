import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux";
import { toast } from "react-toastify";
import { setAccessToken, setRefreshToken } from "../providers";

export const OAuthCallback = () => {
  console.log("OAuthCallback component mounted");
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
        setAccessToken(token);
        dispatch(
          loginUser({
            id: userId,
          })
        );

        if (cartId) {
          localStorage.setItem("cart_id", cartId);
        }

        // navigate("/");
      } catch (error) {
        toast.error("Login failed");
        console.error("OAuth callback error:", error);
        navigate("/login");
      }
    } else {
      toast.error("Login failed - no token received");
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing login...</h2>
        <p>Please wait while we authenticate your account.</p>
      </div>
    </div>
  );
};
