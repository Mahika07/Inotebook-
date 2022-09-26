import { React, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    const handleLogout = () => {
        localStorage.removeItem("token")
        props.showAlert("Sucessfully loged out", "dark")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(233 184 233)' }}>
                <div className="container-fluid">

                    <a className="navbar-brand" >iNoteBook</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>


                        </ul>

                    </div>
                    {!localStorage.getItem("token") ? <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link className="btn btn-dark me-md-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark me-md-2" to="/signup" role="button">Sign up</Link>

                    </div> : <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link className="btn btn-dark me-md-2" to="/login" onClick={handleLogout} role="button">Logout</Link>


                    </div>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
