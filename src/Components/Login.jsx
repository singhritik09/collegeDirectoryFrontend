import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios1 from '../axiosInstance';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("Student"); // Default role
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios1.post("/login", {
                username, password, role: selectedRole 
            });

            if (response.data.message === "NOTMATCH") {
                window.alert("User not registered or invalid password");
            } else if (response.data.message === "SUCCESS") {
                window.alert("Login Successful");
                
                // Redirect based on role
                switch (response.data.role) {
                    case 'STUDENT':
                        navigate('/student-dashboard', { state: { username } });
                        break;
                    case 'FACULTY':
                        navigate('/faculty-dashboard', { state: { username } });
                        break;
                    case 'ADMIN':
                        navigate('/admin-dashboard', { state: { username } });
                        break;
                    default:
                        navigate('/home', { state: { username } });
                }
            }
            setPassword("");
        } catch (e) {
            console.log("Error in login", e);
        }
    }

    return (
        <>
            <style>
                {`
                    body, html {
                        height: 100%;
                        margin: 0;
                        background: linear-gradient(to bottom, #4287f5, #ffffff);
                    }
                `}
            </style>

            <div className="flex flex-col h-full w-full sm:h-screen md:h-screen mb-0 items-center justify-center px-6 py-8 mx-auto lg:py-2 " style={{ overflowX: 'hidden' }}>

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-2 py-6 space-y-2 md:space-y-6 sm:p-8">
                        <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form className="space-y-4 md:space-y-2" method="post" onSubmit={handleLogin} >

                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@domain.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                            </div>
                            <div className="p-4">
                                <select
                                    name="selectedRole"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                    className="bg-gray-700 text-darkblue-700 p-2 text-white rounded-md"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <button type="submit" className="ml-36 text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2 text-center">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
