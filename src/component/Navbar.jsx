import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import eventBus from "../EventBus";

const Navbar = () => {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token") !== null);
    const navRef = useRef(null);
    let componentMounted = true;

    useEffect(() => {
        const getColour = async () => {
            let response = await fetch("https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/colour", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
            if (componentMounted) {
                if(response.status >= 200 && response.status <= 299) {
                    let data = await response.json();
                    navRef.current.style.backgroundColor = data.colour;
                }
            }

            return () => {
                componentMounted = false;
            }
        }

        getColour();
    }, []);

    let notLoggedInButtons = () => {
        return(
            <>
                <Link to="/login" className="btn btn-outline-dark">Login</Link>
                <Link to="/register" className="btn btn-outline-dark ms-2">Register</Link>
            </>
        )
    }

    eventBus.on("logout", () => {
        setLoggedIn(false);
    });

    eventBus.on("login", () => {
        setLoggedIn(true);
    });

    return (
        <div>
            <nav ref={navRef} className="navbar navbar-expand-lg navbar-light py-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">DudeMarket</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li> 
                        </ul>
                        <div className="buttons">
                            {!loggedIn ?
                            notLoggedInButtons()
                            :
                            <Link to="/logout" className="btn btn-outline-dark">Logout</Link>
                            }
                            <Link to="/cart" className="btn btn-outline-dark ms-2"><i className="fa fa-shopping-cart me-1"></i>Cart</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
