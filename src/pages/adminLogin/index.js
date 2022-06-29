import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';
import { login, setRules } from "../../services/auth";

const AdminLogin = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

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
            
            navigate(`/contestations`);
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
        navigate('/');
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
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" onChange={handleEmail} aria-describedby="E-mail" placeholder="Digite o e-mail" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" style={{color: "white"}}>Senha</label>
                                <input type="password" className="form-control" id="password" onChange={handlePassword} placeholder="Digite a senha" />
                            </div>
                            <br />
                            <button className="btn btn-dark">Entrar</button>
                        </form>
                        <hr/>
                        <input className="btn btn-link" onClick={handleNavigate} value="Logar como beneficiário" />
                    </div>           
                </div>
            </div>
        </div>
        </>
    );
};

export default AdminLogin;
