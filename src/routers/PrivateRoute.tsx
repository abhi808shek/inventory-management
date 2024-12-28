import { useMemo } from "react";
import { RootState } from "@/store/rootReducer";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.user);

  const memoizedUser = useMemo(() => user, [user]);

  if (memoizedUser) {
    return <Outlet />;
  }

  const prevUrl = encodeURIComponent(location.pathname + location.search);

  return (
    <Navigate
      to={`/login?prevUrl=${prevUrl}`}
      state={{ prevUrl: location.pathname }}
    />
  );
};

export default PrivateRoute;
