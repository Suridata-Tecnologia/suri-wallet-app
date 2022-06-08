import React, { useState, useEffect } from "react";
import { FaUser, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

const Login = () => {
    const [ cpf, setCpf ] = useState('');
    const [ code, setCode ] = useState('');
    const [ beneficiary, setBeneficiary ] = useState(null);
    const [ stage, setStage ] = useState(1);
    const [ channel, setChannel ] = useState('email');

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        if(cpf && cpf.length >= 11){
            async function findBeneficiaryData(){
                await api
                .get(`/beneficiaries/search/${cpf}`)
                .then((response) => {            
                    setBeneficiary(response.data);
                })
                .catch((err) => {
                    notifyWarn(err.response.data.message);
                });
            }

            findBeneficiaryData();
        }        
    }, [cpf]);

    

    async function sendConfirmAccountCode(){
        const data = { cpf, channel }

        await api
        .post("/send-user-account-confirmation", data)
        .then((response) => {
            notify(response.data.message);
            setStage(2);
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
            setStage(1);
        });
    }

    async function handleSubmit(event){
        event.preventDefault();
        
        if(stage === 1){
            if(cpf.length < 11){
                notifyWarn("Verifique o CPF");
                return
            }

            if(beneficiary && beneficiary.is_first_access) await sendConfirmAccountCode();
        }
        else if(stage === 2){
            if(code.length < 6){
                notifyWarn("Digite um código de verificação válido");
                return
            }

            console.log(code);
        }
    }
    
    function onlyNumbers(value){
        return value.replace(/\D/g, "");
    }

    function handleCPF(e){
        const { value } = e.target;

        if(value.length <= 11) setCpf(onlyNumbers(value));
    }

    function handleCode(e){
        const { value } = e.target;

        setCode(value);
    }
    
    return (
        <>
        <ToastContainer /> 
        <div className="container">             
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-body">
                        <div className="card-header">
                            <img src="https://portal.suridata.com.br/img/suridata_logo_v6.png" alt="Logo login" width="100px" />
                        </div>
                        <hr />
                        <form>
                            <div className="input-group form-group">
                                {stage === 1 ?                                 
                                <>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaUser /></span>
                                    </div>
                                    <input type="text" className="form-control input-group-text" value={cpf || ''} onChange={handleCPF} placeholder="Digite seu CPF" />
                                </>
                                :
                                <>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FaKey /></span>
                                    </div>
                                    <input type="text" className="form-control input-group-text" value={code || ''} onChange={handleCode} placeholder="Digite o código de verificação" />
                                </>
                                }
                                                            
                            </div>                        
                            <div className="button-group">
                                <button className="btn btn-dark" onClick={handleSubmit}>Buscar</button>
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
