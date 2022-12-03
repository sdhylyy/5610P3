import React,{useEffect} from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";

function RegisterPage() {

    // const deployURL="http://localhost:3000/";
    const deployURL="https://alwaysontime.herokuapp.com/";

    const registerURL = deployURL+'api/register/';

    const handleSubmit=(e)=>{
        let name = document.getElementById("username").value;　
        console.log(name);
        let password = document.getElementById("password").value;　
        console.log(password);
        let position = document.getElementById("position").value;　
        console.log(position);
        if(!name||name===""){
            alert("username mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if(!password||password===""){
            alert("password mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if(!position||position===""){
            alert("position mustn't be empty.");
            e.preventDefault();
            return false;
        }
    
    
    　　return true;
    };

    UseCheckMsg();

    useEffect(() => {
        document.getElementById("register-form").action =registerURL;
    },[registerURL]); 

    return (
        <>
            <div>
                <a href="/" id="LogoutAction">
                    back
                </a>
            </div>
            <div id="Register">
                <h1 className="text-center text-info pt-5">Register</h1>
                <div className="container">
                    <div
                        id="Register-row"
                        className="row justify-content-center align-items-center"
                    >
                        <div id="Register-column" className="col-md-6">
                            <div id="Register-box" className="col-md-12">
                                <form
                                    id="register-form"
                                    className="form"
                                    action="/"
                                    method="post"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">
                                            Username:
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">
                                            Password:
                                        </label>
                                        <br />
                                        <input
                                            type="text"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="position" className="text-info">
                                            position:
                                        </label>
                                        <select className="form-select" name="position" id="position">
                                            <option value="teacher">teacher</option>
                                            <option value="student">student</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            className="btn btn-info btn-md"
                                            defaultValue="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;