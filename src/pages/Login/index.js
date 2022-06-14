import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { FaUser, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';
import { login, setRules } from "../../services/auth";

const Login = (props) => {
    const [ cpf, setCpf ] = useState('');
    const [ code, setCode ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ beneficiary, setBeneficiary ] = useState(null);
    const [ channel, setChannel ] = useState('');
    const [ contact, setContact ] = useState('');

    const { stage } = props;

    const navigate = useNavigate();   

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(! beneficiary) navigate('/');
    }, [beneficiary]);

    useEffect(()=>{
        if(cpf && cpf.length >= 11){
            async function findBeneficiaryData(){
                await api
                .get(`/beneficiaries/search/${cpf}`)
                .then((response) => {            
                    setBeneficiary(response.data);
                    if(response.data.is_first_access) navigate('/choose-channel');
                    else navigate('/login');
                    
                })
                .catch((err) => {
                    notifyWarn(err.response.data.message);
                });
            }

            findBeneficiaryData();
        }        
    }, [cpf]);

    async function autheticate(){
        const data = { cpf, password }

        await api
        .post('/login', data)
        .then((response) => {            
            const { token, rules } = response.data;
            
            login(token);
            setRules(rules);
            
            localStorage.setItem('uuid', beneficiary.id);
            navigate(`/home`);
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    async function confirmUserAccount(){
        const data = { code }

        await api
        .post(`/confirm-user-account/${beneficiary.id}`, data)
        .then((response) => {
            notify(response.data.message);
            navigate('/login');
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    async function sendConfirmAccountCode(){
        const data = { cpf, channel, contact }

        await api
        .post("/send-user-account-confirmation", data)
        .then((response) => {
            notify(response.data.message);
            navigate('/confirm-account');
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        
        if(stage === "1"){
            if(cpf.length < 11){
                notifyWarn("Verifique o CPF");
                return
            }
        }
        else if(stage === "2"){
            if(beneficiary && beneficiary.is_first_access) await sendConfirmAccountCode();
            else navigate('/login');
        }
        else if(stage === "3"){
            if(code.length < 6){
                notifyWarn("Digite um código de verificação válido");
                return
            }

            confirmUserAccount()
        }
        else if(stage === "4"){
            autheticate();
        }
    }
    
    function onlyNumbers(value){
        return value.replace(/\D/g, "");
    }

    function handleCPF(e){
        const { value } = e.target;

        if(value.length <= 11) setCpf(onlyNumbers(value));
    }

    function handleContact(e){
        const { value } = e.target;

        setContact(value);
    }
    

    function handleChannel(e){
        const { value } = e.target;
        setChannel(value);
    }

    function handleCode(e){
        const { value } = e.target;

        setCode(value);
    }
    
    function handlePassword(e){
        const { value, name } = e.target;

        setPassword(value);
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
                        <form>
                            <div className="input-group form-group">
                                {stage === "1" &&                                 
                                    <>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FaUser /></span>
                                        </div>
                                        <input type="text" className="form-control input-group-text" value={cpf || ''} onChange={handleCPF} placeholder="Digite seu CPF" />
                                    </>
                                }
                                {stage === "2" &&                                 
                                    <>
                                        <label className="title">Escolha o canal:</label>
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-outline-info" value="email" onClick={handleChannel}>Email</button>                                            
                                            <button type="button" className="btn btn-outline-info" value="sms" onClick={handleChannel}>SMS</button>
                                        </div>
                                        {channel !== '' && <input type="text" className="form-control input-group-text" style={{ marginTop: '10px' }} value={contact} onChange={handleContact} placeholder={`${channel === 'sms' ? '+5511999999999' : 'email@email.com.br'}`} />}
                                    </>
                                }   
                                {stage === "3" &&                                 
                                    <>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FaKey /></span>
                                        </div>
                                        <input type="text" className="form-control input-group-text" value={code || ''} onChange={handleCode} placeholder="Digite o código de verificação" />
                                    </>
                                }   
                                {stage === "4" &&                                 
                                    <>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FaKey /></span>
                                        </div>
                                        <input type="password" className="form-control input-group-text" name="password" value={password || ''} onChange={handlePassword} placeholder="Digite a senha" />
                                    </>
                                }                                                     
                            </div>                        
                            <div className="button-group">
                                <button className="btn btn-dark" onClick={handleSubmit}>
                                    { stage === "1" && "Buscar"}
                                    { stage === "2" && "Enviar código"}
                                    { stage === "3" && "Verificar"}
                                    { stage === "4" && "Entrar"}
                                </button>
                            </div>
                        </form>
                    </div>           
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
