import { useMemo } from "react";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const memoizedUser = useMemo(() => user, [user]);
  if (memoizedUser) {
    return <Outlet />;
  }
  return <Navigate to={`/login`} />;
};

export default PrivateRoute;
