import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const memoizedUser = useMemo(() => user, [user]);

  if (memoizedUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
