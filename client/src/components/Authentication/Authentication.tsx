// import { useState } from "react";
import style from '../../CSS/Authentication/Authentication.module.css'
import { Google } from "../helper/icons";
import img from '../helper/authentication.jpg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const host = process.env.REACT_APP_IP_ADDRESS

const Authentication = (): React.JSX.Element => {
   const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('auth-token-workspace')){
                navigate('/');
        }
        // eslint-disable-next-line
    },[])

    const login = async () => {
        window.open(`${host}/classroom/authentication/google`, '_self')
    }

    return (
        <div className={style.auth_container}>
            <h1>Sign-in</h1>
            <div className={style.auth_main}>
                <div className={style.class_image}>
                    <img src={img} alt="classroom" />
                </div>
                <button onClick={() => login()} className={style.auth_button}> <Google /> <span> Continue with Google </span> </button>
            </div>
        </div>
    );
}
export default Authentication;