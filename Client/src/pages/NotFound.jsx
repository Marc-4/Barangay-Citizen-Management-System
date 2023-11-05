import { Link } from "react-router-dom"
const notFound = () => {

    return (
      <>
        <p>Page not found</p>
        <Link to={'/'}>go to home</Link>
      </>
    )
  }
  
  export default notFound