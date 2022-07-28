import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import eventBus from '../EventBus';

const Register = () => {

    const [first_name, setFirst] = useState("");
    const [last_name, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function register() {
        if(first_name == "" || last_name == "" || email == "" || password == "") {
            setError("Please fill in all the fields.");
        }
        else {
            let userObject = {first_name, last_name, email, password};
            console.log(userObject);
            let response = await fetch("https://muslemah.myweb.cs.uwindsor.ca/comp3340/ecommerce_api/public/api/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(userObject)
        });
        console.log(response.status);
        if (response.status >= 200 && response.status <= 299) {
            setError("");
            let userJson = await response.json();
            localStorage.setItem("token", userJson.token);
            eventBus.dispatch("login", null);
            navigate('/');
        }
        else if(response.status == 422) {
            setError("Email is already taken.");
        }
        else {
            setError("An unexpected error has occured.");
        }
        }
    }

    return (
        <div className="form-container">
            <div class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
                <input type="text" class="form-control mb-2" placeholder="First name" onChange={(e)=>setFirst(e.target.value)} />
                <input type="email" class="form-control mb-2" placeholder="Last name" onChange={(e)=>setLast(e.target.value)} />
                <input type="email" class="form-control mb-2" placeholder="Email address" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" class="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                {error === "" ? null : <div className="error">{error}</div>}
                <button class="btn btn-lg btn-primary btn-block" onClick={() => {register();}}>Register</button>
            </div>
        </div>
    );
}

export default Register;
