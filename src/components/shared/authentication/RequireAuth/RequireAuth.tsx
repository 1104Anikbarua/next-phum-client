import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { IChildren } from "../../../../types";

const RequireAuth = ({ children }: IChildren) => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to={"/login"}
        replace={true}
        state={{ from: location }}
      ></Navigate>
    );
  }

  return children;
};

export default RequireAuth;
