// import { useMemo } from "react";
// import { RootState } from "@/store/rootReducer";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { customLocalStorage } from "@/utils/customLocalStorage";

const PrivateRoute = () => {
  // const { user } = useSelector((state: RootState) => state.user);

  // const memoizedUser = useMemo(() => user, [user]);
  const token = customLocalStorage.getData("token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={`/login`} />;
};

export default PrivateRoute;
