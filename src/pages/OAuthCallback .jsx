import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux";
import { toast } from "react-toastify";
import { setAccessToken, setRefreshToken } from "../providers";
import { getProfileInfo } from "../redux/actions/profileActions";
import PageLoader from "../components/Common/PageLoader";

export const OAuthCallback = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await getProfileInfo();
      return res;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const processOAuthCallback = async () => {
      console.log("Processing OAuth callback");
      const refreshToken = searchParams.get("refresh_token");
      const accessToken = searchParams.get("access_token");

      if (!accessToken || !refreshToken) {
        console.error("Missing required parameters in callback");
        toast.error("Login failed - missing authentication data");
        navigate("/sign-in");
        return;
      }

      try {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        const userDetail = await fetchUser();

        dispatch(loginUser(userDetail));

        console.log("Login successful");
        navigate("/");
        toast.success("Login successful!");
      } catch (error) {
        console.error("OAuth callback error:", error);
        toast.error("Login failed - processing error");
        navigate("/sign-in");
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuthCallback();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <PageLoader />
      </div>
    </div>
  );
};
