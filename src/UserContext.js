import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const UserInfo = createContext()

export default function UserContext({ children }){
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/me").then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                setUser(user)
              });
            }
        });

        if(user?.id){
            setUserProfile(user?.one_user_profile)
        }
    
    }, [user?.id]);

    function handleSubmitSignUp(e, email, password, passwordConfirmation) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
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
            setUser(user)
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
        fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
            setUser(user)
            navigate('/homepage')
            });
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }
    
    function logOut() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
              navigate('/login')
            }
        });
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