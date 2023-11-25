import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

function PrivateRoute({ children, roles }) {
  const token = Cookies.get('authorization')

  if (!token) {
    return <Navigate to='/' />
  }

  const decodedToken = jwtDecode(token)
  if (!decodedToken || !roles.includes(decodedToken.role))
    return <Navigate to={'/unauthorized'} />

  return children
}

export default PrivateRoute
