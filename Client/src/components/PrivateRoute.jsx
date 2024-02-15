import { Navigate } from "react-router-dom";
function PrivateRoute({ children, roles }) {
    const userRole = localStorage.getItem('userRole');
   
    if (!userRole || !roles.includes(userRole)) {
     return <Navigate to={'/unauthorized'} />
    }
    return children;
   }

   export default PrivateRoute