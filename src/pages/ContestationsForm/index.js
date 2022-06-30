import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const ContestationsForm = (props) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ currentContestation, setCurrentContestation ] = useState();
    const [ previousStatus, setPreviousStatus ] = useState();
    const [op, setOp] = useState(false);
    
    const { uti_id } = useParams();

    const search = useLocation().search;    
    var params = JSON.parse(JSON.stringify(new URLSearchParams(search).get('params'))); 

    if(params.startsWith('"')){
        params = JSON.parse(params.slice(1, -1));
    }  
    else{
        params = JSON.parse(params);
    }

    const utilizacao_code = uti_id.split("_")[1];
    const cpf      = uti_id.split("_")[0];

    const navigate = useNavigate(); 

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);
    
    useEffect(()=>{        
        async function handleBeneficiaries(){
            await api
            .get(`/beneficiaries/search/${cpf}`)
            .then((response) => {            
                setCurrentUser(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleBeneficiaries();      

        async function handleContestations(){
            await api
            .get(`/contestations/search/${utilizacao_code}`)
            .then((response) => {        
                if(response.data.length > 0){ setOp(true) } 
                setCurrentContestation(response.data[0]);
                setPreviousStatus(response.data[0].status);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleContestations();  

    }, [cpf, utilizacao_code]);

    async function submitForm(e){
        e.preventDefault();

        let data = {
            utilizacao_code, 
            description: currentContestation.description, 
            user_id: currentUser.id,
            beneficiary: currentUser.name,
            cpf: currentUser.cpf,
            params,
            status: currentContestation.status || 'Não iniciado', 
            feedback: currentContestation.feedback, 
            status_feedback: currentContestation.status_feedback, 
            accountAccess: currentContestation.accountAccess,
        };

        if(!op){
            const hasContestation = await api.get(`/contestations/search/${utilizacao_code}`)
            if(hasContestation.data.length > 0){
                notifyWarn('Contestação já cadastrada!');
                return;
            }
            await api.post(`/contestations`, data)
            .then((response) => {            
                notify('Contestação cadastrada!');
                handleHistory(response.data);  
                setCurrentContestation(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }
        else{
            data['previous_status'] = previousStatus;
            await api.put(`/contestations/${currentContestation.id}`, data)
            .then((response) => {          
                handleHistory(currentContestation);  
                notify('Contestação alterada!');
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }                   
    }

    async function handleHistory(contestation){
        const data = {
            contestation_id: contestation.id,
            contestation_status: contestation.status,
        }
        await api.post(`/contestations/history`, data)
        .then((response) => {            
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    function handleDescription(e){
        const { value } = e.target;
        let list = { ...currentContestation };
        list.description = value;
        setCurrentContestation(list);
    }

    function handleStatus(e){
        const { value } = e.target;
        let list = { ...currentContestation };
        list.status = value;
        setCurrentContestation(list);
    }

    function handleStatusFeedback(e){
        const { value } = e.target;
        let list = { ...currentContestation };
        list.status_feedback = value;
        setCurrentContestation(list);
    }

    function handleFeedback(e){
        const { value } = e.target;
        let list = { ...currentContestation };
        list.feedback = value;
        setCurrentContestation(list);
    }

    function handleAccountAccess(e){
        const { checked } = e.target;
        let list = { ...currentContestation };
        list.accountAccess = checked ? 1: 0;
        setCurrentContestation(list);
    }

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        {currentUser && 
            <div className="container">
                <br />
                <h2>Detalhes da contestação</h2>
                <hr />
                <form className="panel" onSubmit={submitForm}>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Código Usuário/Servico</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={params['CodUsuarioServico']} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Nome Beneficiário</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={params['Descricao_Usuario']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">CPF Titular</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={currentUser.cpf_holder} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">E-mail</label>
                        <div className="col-sm-4"><input placeholder="E-mail" name="email" type="text" className="form-control" readOnly defaultValue={currentUser.email} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">Celular</label>
                        <div className="col-sm-4"><input placeholder="Celular" name="phone" type="text" className="form-control" readOnly defaultValue={currentUser.phone} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Código Procedimento</label>
                        <div className="col-sm-4"><input placeholder="cd_original" name="cd_original" type="text" className="form-control" readOnly defaultValue={params['cd_original']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">Rede Reembolso</label>
                        <div className="col-sm-4"><input placeholder="Rede_Reembolso" name="Rede_Reembolso" type="text" className="form-control" readOnly defaultValue={params['Rede_Reembolso']} /></div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Número da Conta</label>
                        <div className="col-sm-4"><input placeholder="NumeroConta" name="NumeroConta" type="text" className="form-control" readOnly defaultValue={params['NumeroConta']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">Data do Atendimento</label>
                        <div className="col-sm-4"><input placeholder="Data_Atendto" name="Data_Atendto" type="text" className="form-control" readOnly defaultValue={params['Data_Atendto']} /></div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Descrição Procedimento</label>
                        <div className="col-sm-4"><input placeholder="Descricao_Operadora" name="Descricao_Operadora" type="text" className="form-control" readOnly defaultValue={params['Descricao_Operadora']} /></div>

                        <label className="form-label col-form-label col-sm-2">Tipo Evento</label>
                        <div className="col-sm-4"><input placeholder="Tipo_Evento" name="Tipo_Evento" type="text" className="form-control" readOnly defaultValue={params['Tipo_Evento']} /></div>
                    </div>  
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Status</label>
                        <div className="col-sm-10">
                            <select className="form-select" value={currentContestation && currentContestation.status} disabled={localStorage.getItem('rules') === "corretor" ? false: true} onChange={handleStatus} aria-label="Default select">
                                <option selected={currentContestation && (currentContestation.status === "Não iniciado") ? 'selected' : false}>Não iniciado</option>
                                <option selected={currentContestation && (currentContestation.status === "Em andamento") ? 'selected' : false}>Em andamento</option>
                                <option selected={currentContestation && (currentContestation.status === "Concluido") ? 'selected' : false}>Concluido</option>
                            </select>
                        </div>
                    </div>   
                    {currentContestation && currentContestation.status === "Concluido" ?
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-2">Status - feedback</label>
                            <div className="col-sm-4">
                                <select className="form-select" value={currentContestation.status_feedback} disabled={localStorage.getItem('rules') === "corretor" ? false: true} onChange={handleStatusFeedback} aria-label="Default select">
                                    <option selected={currentContestation.status_feedback === "Aceito" ? 'selected' : false}>Aceito</option>
                                    <option selected={currentContestation.status_feedback === "Não aceito" ? 'selected' : false}>Não aceito</option>
                                </select>
                            </div>
                    
                            <label className="form-label col-form-label col-sm-2">Feedback</label>
                            <div className="col-sm-4">
                                <textarea placeholder="Descrição" className="form-control" readOnly={localStorage.getItem('rules') === "corretor" ? false: true} value={currentContestation && currentContestation.feedback} onChange={handleFeedback}>{currentContestation && currentContestation.feedback}</textarea>
                            </div>
                        </div> 
                        : ''
                    }                                 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Descrição</label>
                        <div className="col-sm-10">
                            {currentUser && currentUser.id === localStorage.getItem('uuid') ? 
                            <textarea placeholder="Descrição" className="form-control" value={currentContestation && currentContestation.description} onChange={handleDescription}>{currentContestation && currentContestation.description}</textarea>
                            : 
                            <textarea placeholder="Descrição" className="form-control" readOnly value={currentContestation && currentContestation.description}>{currentContestation && currentContestation.description ? currentContestation.description : ''}</textarea>
                            }
                            
                        </div>
                    </div>
                    <div style={{ color: "#555", fontSize: "12px", display: 'flex' }}>                        
                        <input type = "checkbox" id="allowAccountAccess" name="allowAccountAccess" onClick={handleAccountAccess} checked={currentContestation && currentContestation.accountAccess === 1} />
                        <label style={{ marginLeft:"10px" }} htmlFor="allowAccountAccess">
                            Em observância à Lei nº. 13.709/18 – Lei Geral de Proteção de Dados Pessoais e demais normativas aplicáveis sobre proteção de Dados Pessoais, manifesto-me de forma informada, livre, expressa e consciente, no sentido de autorizar a corretora Sciath a realizar a análise necessária junto a operadora de saúde para esclarecer a contestação que estou encaminhando sobre a utilização do plano de saúde acima
                        </ label>                    
                    </div>
                    <hr />
                    <div role="toolbar" className="mb-3 row">
                        <div className="buttons">
                            <button type="submit" className="btn btn-success" disabled={currentContestation && currentContestation.accountAccess === 1?false:true} >Salvar</button>
                            <button type="button" className="btn btn-danger" style={{marginRight: '10px'}} onClick={ () => navigate(-1) }>Voltar</button>                        
                        </div>
                    </div>
                </form>
            </div>        
        }
        </>
    );
};

export default ContestationsForm;
