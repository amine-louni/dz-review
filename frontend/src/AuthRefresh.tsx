import { useEffect } from "react";
import { setAuthToken } from "../api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/userSlice";
import { refreshUserToken } from "../utils/authed";

const AuthRefresh = () => {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    refreshUserToken().then((data) => {
      dispatch(setUser(data));

      if (!user?.accessToken) return;
      setAuthToken(user?.accessToken);
    });
    const interval = setInterval(() => {
      refreshUserToken().then((data) => {
        dispatch(setUser(data));
        if (!user?.accessToken) return;
        setAuthToken(user?.accessToken);
      });
    }, 900000);
    return () => clearInterval(interval);
  }, [user?.accessToken]);
  return null;
};

export default AuthRefresh;
