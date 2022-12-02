import React,{useEffect} from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";

function IndexPage() {

    const deployURL="http://localhost:3000/";
    // const deployURL="https://intense-lowlands-69751.herokuapp.com/";

    const loginURL = deployURL+'api/login/';

    const handleSubmit=(e)=>{
        let name = document.getElementById("username").value;　
        console.log(name);
        let password = document.getElementById("password").value;　
        console.log(password);
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
       
    　　return true;
    };

    UseCheckMsg();

    useEffect(() => {
        document.getElementById("login-form").action =loginURL;
    },[loginURL]);    

    return (
        <div id="login">
            <h1 className="text-center text-info pt-5">Login</h1>
            <div className="container">
                <div
                    id="login-row"
                    className="row justify-content-center align-items-center"
                >
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form
                                id="login-form"
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
                                    <input
                                        type="submit"
                                        className="btn btn-info btn-md"
                                        defaultValue="submit"
                                    />
                                </div>
                                <div id="register-link" className="text-right">
                                    <a href="/register" className="text-info">
                                        Register here
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

IndexPage.propTypes = {};

export default IndexPage;