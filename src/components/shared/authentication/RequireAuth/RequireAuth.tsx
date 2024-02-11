import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { IChildren } from "../../../../types";
import { IUser, logout } from "../../../../redux/features/auth/authSlice";
import { getDecodedUser } from "../../../../utlis/decodeUser.utlis";

const RequireAuth = ({ children, role }: IChildren) => {
  const { token } = useAppSelector((state) => state.auth);

  let user;
  if (token) {
    user = getDecodedUser(token as string); //verify the user from token
  }

  const dispatch = useAppDispatch();
  const location = useLocation();

  //if user role is not match with permission role(e.g:student try to access admin routes) to access route then logout the user
  if (role !== undefined && role !== (user as IUser)?.role) {
    dispatch(logout());
    return <Navigate to={"/login"}></Navigate>;
  }

  //if user donot have token take the user to the login page
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
