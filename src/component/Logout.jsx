import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import eventBus from '../EventBus';

const Logout = () => {

    const navigate = useNavigate();
    let componentMounted = true;

    useEffect(() => {
        if(localStorage.getItem("token") === null) {
            navigate("/EcommerceApp/login");
            return;
        }
        const logout = async () => {
            let response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        });
            if (componentMounted) {
                if(response.status >= 200 && response.status <= 299) {
                    localStorage.removeItem("token");
                    eventBus.dispatch("logout", null);
                    navigate('/EcommerceApp/');
                }
                else {
                    navigate('/EcommerceApp/');
                }
            }

            return () => {
                componentMounted = false;
            }
        }

        logout();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" >
            <div className="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Logout;
