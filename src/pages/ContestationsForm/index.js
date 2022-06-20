import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const ContestationsForm = (props) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ currentContestation, setCurrentContestation ] = useState();
    const [op, setOp] = useState(false);
    
    const { uti_id } = useParams();

    const utilizacao_code = uti_id.split("_")[0];
    const cpf      = uti_id.split("_")[1];

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
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleContestations();  

    }, []);

    async function submitForm(e){
        e.preventDefault();
        const data = {
            utilizacao_code, 
            description: currentContestation.description, 
            user_id: currentUser.id,
            beneficiary: currentUser.name,
            cpf: currentUser.cpf,
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
                navigate('/contestations');
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }
        else{
            console.log(currentContestation);
            await api.put(`/contestations/${currentContestation.id}`, data)
            .then((response) => {            
                notify('Contestação alterada!');
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }
        
    }

    function handleDescription(e){
        const { value } = e.target;
        let list = { ...currentContestation };
        list.description = value;
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
                        <label className="form-label col-form-label col-sm-2">Código da utilização</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={utilizacao_code} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Beneficiário</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={currentUser.name} /></div>
                   
                        <label className="form-label col-form-label col-sm-2">CPF Titular</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" readOnly defaultValue={currentUser.cpf_holder} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Descrição</label>
                        <div className="col-sm-10">
                            {currentUser && currentUser.id === localStorage.getItem('uuid') ? 
                            <textarea placeholder="Descrição" className="form-control" value={currentContestation && currentContestation.description} onChange={handleDescription}>{currentContestation && currentContestation.description}</textarea>
                            : 
                            <textarea placeholder="Descrição" className="form-control" readOnly value={currentContestation && currentContestation.description}>{currentContestation && currentContestation.description}</textarea>
                            }
                            
                        </div>
                    </div>
                    <div role="toolbar" className="mb-3 row">
                        <div className="buttons">
                            {currentUser && currentUser.id === localStorage.getItem('uuid') ? <button type="submit" className="btn btn-success">Salvar</button> : ''}
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
