import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.user);

  const memoizedUser = useMemo(() => user, [user]);

  if (memoizedUser) {
    let prevUrl =
      new URLSearchParams(location.search).get("prevUrl") || location.pathname;
    if (prevUrl.includes("/login") || prevUrl.includes("/signup")) {
      prevUrl = "/";
    }
    return <Navigate to={prevUrl} state={{ prevUrl: location.pathname }} />;
  }

  return <Outlet />;
};

export default PublicRoute;
