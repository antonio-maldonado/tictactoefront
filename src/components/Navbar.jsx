import {PropTypes} from "prop-types";
import { Link } from "react-router-dom";

export const Navbar=({handlerLogout})=>{

    return(
        <>
            <nav className="navbar">
                <ul className="navbar__li">
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>

                    <li>
                        <Link to={"/boards/"}>Boards</Link>
                    </li>   

                    <li>
                        <a onClick={handlerLogout}>
                            Logout
                        </a>
                    </li>   
                </ul>
            </nav>
        </>
    )
}

Navbar.propTypes={
    handlerLogout: PropTypes.func.isRequired,
}