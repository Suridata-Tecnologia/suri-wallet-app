import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';
import { login, setRules } from "../../services/auth";

import { adminLoginButtonText, adminLoginInputText, adminLoginLinkText, adminLoginTitleText } from '../../utils/language';

const AdminLogin = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    let language = localStorage.getItem('language');
    if(language === null){
        language = 'pt-br'
    }
    else{
        const lang = new URLSearchParams(window.location.search).get('lang'); 
        language = lang || localStorage.getItem('language');
    }
    localStorage.setItem('language', language);

    const navigate = useNavigate();   

    const notifyWarn = (message) => toast.warn(message);

    async function autheticate(){
        const data = { email, password }

        await api
        .post('/admin-login', data)
        .then((response) => {            
            const { token, rules, uuid, refreshToken, logo, health_id } = response.data;

            login(token);
            setRules(rules);

            localStorage.setItem('token', token); 
            localStorage.setItem('rt', refreshToken);   
            localStorage.setItem('uuid', uuid);     
            localStorage.setItem('logo', logo);
            localStorage.setItem('hb_id', health_id); 
            
            navigate(`/contestations?lang=${localStorage.getItem('language')}`)
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });         
    }

    async function handleSubmit(event){
        event.preventDefault();

        await autheticate();
    }

    function handleEmail(e){
        const { value } = e.target;

        setEmail(value);
    }
    
    function handlePassword(e){
        const { value } = e.target;

        setPassword(value);
    }

    function handleNavigate(){
        navigate(`/?lang=${localStorage.getItem('language') || 'pt-br'}`);
    }
    return (
        <>
        <ToastContainer /> 
        <div className="auth-container">             
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header">
                            <img src="https://portal.suridata.com.br/img/suridata_logo_v6.png" alt="Logo login" width="100px" />
                        </div>
                        <hr />                        
                        <form onSubmit={handleSubmit}>
                            <div className="form-group" style={{color: "white"}}>
                                <label htmlFor="email">{adminLoginTitleText[language]['email']}</label>
                                <input type="email" className="form-control" id="email" onChange={handleEmail} value={email || ''} placeholder={adminLoginInputText[language]['email']} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" style={{color: "white"}}>{adminLoginTitleText[language]['password']}</label>
                                <input type="password" className="form-control" id="password" onChange={handlePassword} value={password || ''} placeholder={adminLoginInputText[language]['password']} />
                            </div>
                            <br />
                            <button className="btn btn-dark">{adminLoginButtonText[language]}</button>
                        </form>
                        <hr/>
                        <button className="btn btn-link" onClick={handleNavigate} >{adminLoginLinkText[language]}</button>
                    </div>           
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminLogin;
