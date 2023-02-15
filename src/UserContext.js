import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from './pages/Login';

const UserInfo = createContext()

export default function UserContext({ children }){
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const navigate = useNavigate();

    // console.log(user)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
    
        fetch("https://fortbase-api.onrender.com/auto_login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
        .then((r) => {
        if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setUserProfile(user.one_user_profile)
        })
        }})
  
      }, [user?.id]);

    function handleSubmitSignUp(e, email, password, passwordConfirmation) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("https://fortbase-api.onrender.com/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            password_confirmation: passwordConfirmation,
        }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
            setUser(user.user);
            window.localStorage.setItem("token", JSON.stringify(user.jwt));
            navigate('/homepage')
            });
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

    function handleSubmitLogin(e, email, password){
        e.preventDefault();
        setIsLoading(true);
        fetch("https://fortbase-api.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
            window.localStorage.setItem("token", JSON.stringify(user.jwt));
            setUser(user.user);
            navigate('/homepage')
            });
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }
    
    function logOut() {
        setUser(null);
        setUserProfile(null);
        window.localStorage.clear();
        return(
            <Login />
        )
    }

    return (
        <div>
            <UserInfo.Provider 
            value={{
                user,
                logOut,
                errors,
                isLoading,
                userProfile,
                setUserProfile,
                handleSubmitLogin,
                handleSubmitSignUp
            }}>
                {children}
            </UserInfo.Provider>
        </div>
    )
}

export function UserState (){
    return useContext(UserInfo);
}