// import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { RootState } from "@/store/rootReducer";
// import { useSelector } from "react-redux";
import { customLocalStorage } from "@/utils/customLocalStorage";
const PublicRoute = () => {
  // const { user } = useSelector((state: RootState) => state.user);

  // const memoizedUser = useMemo(() => user, [user]);
  const token = customLocalStorage.getData("token");
  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
