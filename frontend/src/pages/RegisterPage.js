import React, { useEffect } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";

function RegisterPage() {


    const registerURL = '/api/register/';

    const handleSubmit = (e) => {
        let name = document.getElementById("username").value;
        console.log(name);
        let password = document.getElementById("password").value;
        console.log(password);
        let position = document.getElementById("position").value;
        console.log(position);
        if (!name || name === "") {
            alert("username mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if (!password || password === "") {
            alert("password mustn't be empty.");
            e.preventDefault();
            return false;
        }
        if (!position || position === "") {
            alert("position mustn't be empty.");
            e.preventDefault();
            return false;
        }


        return true;
    };

    UseCheckMsg();

    useEffect(() => {
        document.getElementById("register-form").action = registerURL;
    }, [registerURL]);

    return (
        <>
            <nav>
                <a href="/" id="LogoutAction">
                    back
                </a>
            </nav>
            <header>
                <h1 className="text-center aoe-text pt-5">Register</h1>
            </header>
            <main>
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
                                        <label htmlFor="username" className="aoe-text">
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
                                        <label htmlFor="password" className="aoe-text">
                                            Password:
                                        </label>
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="position" className="aoe-text">
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
                                            className="btn btn-info btn-md aoe-btn-submit"
                                            defaultValue="submit"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

RegisterPage.propTypes = {};

export default RegisterPage;