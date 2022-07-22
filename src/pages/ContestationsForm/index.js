import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';
import { 
    formContestationTitle, 
    formContestationLGPDText, 
    formButton, 
    formContestationInputTile,
    formContestationDropdown1,
    formContestationDropdown2 } from '../../utils/language';

const ContestationsForm = (props) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ currentContestation, setCurrentContestation ] = useState({
        "id": "",
        "utilizacao_code": "",
        "description": "",
        "params": "",
        "status": "",
        "status_feedback": null,
        "feedback": null,
        "created_at": "",
        "updated_at": "",
        "user_id": "",
        "accountAccess": null,
        "reason_cancellation": null,
        "name": "",
        "cpf": "",
        "email": null,
        "phone": ""
    });
    const [ previousStatus, setPreviousStatus ] = useState();
    const [op, setOp] = useState(false);
    
    const language = localStorage.getItem('language');
    
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
            .get(`/contestations/findbycode/${utilizacao_code}`)
            .then((response) => {      
                if(response.data.length > 0){ 
                    setOp(true);
                    setPreviousStatus(response.data[0].status);
                    setCurrentContestation(response.data[0]);   
                }                              
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
            const hasContestation = await api.get(`/contestations/findbycode/${utilizacao_code}`)
            if(hasContestation.data.length > 0){
                notifyWarn('Contestação já cadastrada!');
                return;
            }
            else{
                await api.post(`/contestations`, data)
                .then((response) => {            
                    notify('Contestação cadastrada!');
                    handleHistory(response.data);  
                    window.close();
                })
                .catch((err) => {
                    notifyWarn(err.response.data.message);
                });
            }
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
        navigate(-1);                
    }

    async function handleHistory(contestation){
        const data = {
            contestation_id: contestation.id,
            contestation_status: contestation.status,
            last_updated_for: localStorage.getItem('uuid')
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
                <h2>{formContestationTitle[language]}</h2>
                <hr />
                <form className="panel" onSubmit={submitForm}>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['codigo_identificacao']}</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={params['CodUsuarioServico']} /></div>

                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['prestador']}</label>
                        <div className="col-sm-4"><input placeholder="Prestador" name="prestador" type="text" className="form-control" readOnly defaultValue={params['Prestador']} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['nome']}</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={params['Descricao_Usuario']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['cpf_titular']}</label>
                        <div className="col-sm-4"><input placeholder={formContestationInputTile[language]['cpf_titular']} name="name" type="text" className="form-control" readOnly defaultValue={currentUser.cpf_holder} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['email']}</label>
                        <div className="col-sm-4"><input placeholder="E-mail" name="email" type="text" className="form-control" readOnly defaultValue={currentUser.email} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['celular']}</label>
                        <div className="col-sm-4"><input placeholder="Celular" name="phone" type="text" className="form-control" readOnly defaultValue={currentUser.phone} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['codigo_procedimento']}</label>
                        <div className="col-sm-4"><input placeholder="cd_original" name="cd_original" type="text" className="form-control" readOnly defaultValue={params['cd_original']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['rede_cred_reembolso']}</label>
                        <div className="col-sm-4"><input placeholder="Rede_Reembolso" name="Rede_Reembolso" type="text" className="form-control" readOnly defaultValue={params['Rede_Reembolso']} /></div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['numero_conta']}</label>
                        <div className="col-sm-4"><input placeholder="NumeroConta" name="NumeroConta" type="text" className="form-control" readOnly defaultValue={params['NumeroConta']} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['data_atendimento']}</label>
                        <div className="col-sm-4"><input placeholder="Data_Atendto" name="Data_Atendto" type="text" className="form-control" readOnly defaultValue={params['Data_Atendto']} /></div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['descricao_procedimento']}</label>
                        <div className="col-sm-4"><input placeholder="Descricao_Operadora" name="Descricao_Operadora" type="text" className="form-control" readOnly defaultValue={params['Descricao_Operadora']} /></div>

                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['Tipo_atendimento']}</label>
                        <div className="col-sm-4"><input placeholder="Tipo_Evento" name="Tipo_Evento" type="text" className="form-control" readOnly defaultValue={params['Tipo_Evento']} /></div>
                    </div>  
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['status']}</label>
                        <div className="col-sm-10">
                            <select 
                            className="form-select" 
                            value={currentContestation.status} 
                            disabled={localStorage.getItem('rules') === "corretor" && (currentContestation.status !== 'Concluido' && currentContestation.status !== 'Cancelada') ? false: true} 
                            onChange={handleStatus} 
                            aria-label="Default select">
                                <option value="Não iniciado">{formContestationDropdown1[language]['nao_iniciado']}</option>
                                <option value="Em andamento">{formContestationDropdown1[language]['em_andamento']}</option>
                                <option value="Concluido">{formContestationDropdown1[language]['concluido']}</option>
                            </select>
                        </div>
                    </div>   
                    {currentContestation.status === "Concluido" ?
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-2">Status - feedback</label>
                            <div className="col-sm-4">
                                <select className="form-select" value={currentContestation.status_feedback} disabled={localStorage.getItem('rules') === "corretor" ? false: true} onChange={handleStatusFeedback} aria-label="Default select">
                                    <option selected="Aceito">{formContestationDropdown2[language]['aceito']}</option>
                                    <option selected="Não aceito">{formContestationDropdown2[language]['nao_aceito']}</option>
                                </select>
                            </div>
                    
                            <label className="form-label col-form-label col-sm-2">Feedback</label>
                            <div className="col-sm-4">
                                <textarea placeholder="Descrição" className="form-control" readOnly={localStorage.getItem('rules') === "corretor" ? false: true} value={currentContestation.feedback} onChange={handleFeedback}>{currentContestation.feedback}</textarea>
                            </div>
                        </div> 
                        : ''
                    }                                 
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{formContestationInputTile[language]['descricao']}</label>
                        <div className="col-sm-10">
                            {currentUser &&  localStorage.getItem('rules') &&
                            (localStorage.getItem('rules') === 'titular' || localStorage.getItem('rules') === 'beneficiario') &&
                            (currentContestation.status !== 'Concluido' && currentContestation.status !== 'Cancelada')
                            ? 
                                <textarea 
                                placeholder="Descrição" 
                                className="form-control" 
                                value={currentContestation.description ? currentContestation.description : ''} 
                                onChange={handleDescription}>
                                    {currentContestation.description ? currentContestation.description : ''}
                                </textarea>
                            : 
                            <textarea placeholder="Descrição" className="form-control" readOnly value={currentContestation.description}>{currentContestation.description ? currentContestation.description : ''}</textarea>
                            }
                            
                        </div>
                    </div>
                    <div style={{ color: "#555", fontSize: "12px", display: 'flex' }}>                        
                        <input type = "checkbox" id="allowAccountAccess" name="allowAccountAccess" onChange={handleAccountAccess} checked={currentContestation.accountAccess === 1} />
                        <label style={{ marginLeft:"10px" }} htmlFor="allowAccountAccess">
                        {formContestationLGPDText[language]}
                        </ label>                    
                    </div>
                    <hr />
                    <div role="toolbar" className="mb-3 row">
                        <div className="buttons">
                            {currentContestation && (currentContestation.status !== 'Concluido' && currentContestation.status !== 'Cancelada') ?
                                <button type="submit" className="btn btn-success" disabled={currentContestation.accountAccess === 1?false:true} >{formButton[language]['avancar']}</button>
                                : ''
                            }
                            <button type="button" className="btn btn-danger" style={{marginRight: '10px'}} onClick={ () => navigate(-1) }>{formButton[language]['voltar']}</button>                        
                        </div>
                    </div>
                </form>
            </div>        
        }
        </>
    );
};

export default ContestationsForm;
