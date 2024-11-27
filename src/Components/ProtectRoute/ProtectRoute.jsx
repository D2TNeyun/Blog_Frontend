import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const RoleBaseRoute = (props) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const isEmployRoute = window.location.pathname.startsWith("/employ");
  const isUserRoute = window.location.pathname.startsWith("/user");

  const userRole = useSelector((state) => state.user?.user?.user?.roles);

  if (isAdminRoute && userRole.includes("Admin")) {
    return <>{props.children}</>;
  } else if (isEmployRoute && userRole.includes("Employee")) {
    return <>{props.children}</>;
  } else if (isUserRoute && userRole.includes("User")) {
    return <>{props.children}</>;
  } else {
    return <Loading />;
  }
};

function ProtectedRoute(props) {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        // <Redirect to="/" />
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default ProtectedRoute;
