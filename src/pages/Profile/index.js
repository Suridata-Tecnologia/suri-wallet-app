import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Profile = (props) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ password, setPassword ] = useState();
    const [ password1, setPassword1 ] = useState();

    const navigate = useNavigate(); 

    const { user_id } = useParams();

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function handleBeneficiaries(){
            await api
            .get(`/beneficiaries/${user_id}`)
            .then((response) => {            
                setCurrentUser(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleBeneficiaries();      
    }, []);

    async function submitForm(e){
        e.preventDefault();

        await api.put(`/beneficiaries/${localStorage.getItem('uuid')}`, currentUser)
        .then((response) => {            
            setCurrentUser(response.data);
            notify('Usuário alterado!');
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    function handlePassword(e){
        const { value, name } = e.target;

        if(name === 'password'){ setPassword(value); }
        else{ setPassword1(value); }        
    }    

    async function onSubmitPassword(){
        if(password !== password1){ notifyWarn("Senhas diferentes!"); return; }
        await api.put(`/beneficiaries/password/${localStorage.getItem('uuid')}`, currentUser)
        .then((response) => {            
            setCurrentUser(response.data);
            notify('Senha alterada!');
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }
    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        {currentUser && 
            <div className="container">
                <br />
                <h2>Dados de cadastro</h2>
                <hr />
                <form className="panel" onSubmit={submitForm}>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Nome</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" defaultValue={currentUser.name} readOnly /></div>
                        {currentUser.id === localStorage.getItem('uuid') && 
                            <input className="btn btn-link col-sm-6" data-toggle="modal" data-target="#passModal" defaultValue="Alterar Senha" />
                        }
                    </div>
                    <div className="mb-3 row">
                    <label className="form-label col-form-label col-sm-2">CPF</label>
                        <div className="col-sm-4"><input placeholder="00000000000" name="cpf" type="text" className="form-control" defaultValue={currentUser.cpf} readOnly /></div>

                        <label className="form-label col-form-label col-sm-2">CPF Titular</label>
                        <div className="col-sm-4"><input placeholder="00000000000" name="cpf_holder" type="text" className="form-control" defaultValue={currentUser.cpf_holder} readOnly /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">Empresa</label>
                        <div className="col-sm-10"><input placeholder="Empresa" name="company" type="text" className="form-control" defaultValue={currentUser.company} readOnly /></div>

                    </div>
                    <div role="toolbar" className="mb-3 row">
                        <div className="buttons">
                            {currentUser && currentUser.id === localStorage.getItem('uuid') ? <button type="submit" className="btn btn-success">Salvar</button> : ''}                            
                            <button type="button" className="btn btn-danger" style={{marginRight: '10px'}} onClick={ () => navigate(-1) }>Voltar</button>                        
                        </div>
                    </div>
                </form>

                <div className="modal fade" id="passModal" tabIndex="-1" role="dialog" aria-labelledby="passModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="passModalLabel">Alterar senha</h5>
                        <button type="button" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'transparent'}}>
                        x
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-4">Senha</label>
                            <div className="col-sm-8"><input name="password" type="password" className="form-control" onChange={handlePassword} value={password} /></div>
                        </div>
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-4">Confirme Senha</label>
                            <div className="col-sm-8"><input name="password1" type="password" className="form-control" onChange={handlePassword} value={password1} /></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-success" onClick={onSubmitPassword} defaultValue="Alterar" />
                        <input type="button" className="btn btn-secondary" data-dismiss="modal" defaultValue="Fechar" />                  
                    </div>
                    </div>
                </div>
                </div>


            </div>        
        }
        </>
    );
};

export default Profile;
