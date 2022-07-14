import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';
import { profileLink, profileModalTitle, profileTitle, profileModalInputTitle, profileInputTitle, formButton } from '../../utils/language';

const Profile = (props) => {    
    const [ currentUser, setCurrentUser ] = useState();
    const [ password, setPassword ] = useState();
    const [ password1, setPassword1 ] = useState();
    const [ firstChannel, setFirstChannel ] = useState();

    const language = localStorage.getItem('language');

    const navigate = useNavigate(); 

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    const { user_id } = useParams();
    useEffect(()=>{
        async function handleBeneficiaries(){
            await api
            .get(`/beneficiaries/${user_id}`)
            .then((response) => {            
                setCurrentUser(response.data);
                if(response.data.email === null) setFirstChannel('email');
                else if(response.data.phone === null) setFirstChannel('phone');
                else setFirstChannel('');
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleBeneficiaries();      
    }, [user_id, firstChannel]);

    async function submitForm(e){
        e.preventDefault();

        if(currentUser.email === null){
            notifyWarn('Digite um e-mail!');
            return;
        }

        if(currentUser.phone === null){
            notifyWarn('Digite o celular!');
            return;
        }

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

    function handleInputChange(e){
        const { value, name } = e.target;

        let list = { ...currentUser };

        if(name === 'email') list.email = value;
        else list.phone = value;

        setCurrentUser(list);
    }
    
    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        {currentUser && 
            <div className="container">
                <br />
                <h2>{profileTitle[language]}</h2>
                <hr />
                <form className="panel" onSubmit={submitForm}>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['nome']}</label>
                        <div className="col-sm-4"><input placeholder="Nome" name="name" type="text" className="form-control" defaultValue={currentUser.name} readOnly /></div>
                        {currentUser.id === localStorage.getItem('uuid') && 
                            <input className="btn btn-link col-sm-5" data-toggle="modal" data-target="#passModal" defaultValue={profileLink[language]} />
                        }
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['cpf']}</label>
                        <div className="col-sm-4"><input placeholder="00000000000" name="cpf" type="text" className="form-control" defaultValue={currentUser.cpf} readOnly /></div>

                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['cpf_titular']}</label>
                        <div className="col-sm-4"><input placeholder="00000000000" name="cpf_holder" type="text" className="form-control" defaultValue={currentUser.cpf_holder} readOnly /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['email']}</label>
                        <div className="col-sm-4"><input placeholder="E-mail" name="email" type="text" className="form-control" value={currentUser.email || ''} onChange={handleInputChange} readOnly={firstChannel === 'email' ? false: true} /></div>

                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['celular']}</label>
                        <div className="col-sm-4"><input placeholder="Celular" name="phone" type="text" className="form-control" value={currentUser.phone || ''} onChange={handleInputChange} /></div>
                    </div>
                    <div className="mb-3 row">
                        <label className="form-label col-form-label col-sm-2">{profileInputTitle[language]['empresa']}</label>
                        <div className="col-sm-10"><input placeholder="Empresa" name="company" type="text" className="form-control" defaultValue={currentUser.company} readOnly /></div>

                    </div>
                    <div role="toolbar" className="mb-3 row">
                        <div className="buttons">
                            {currentUser && currentUser.id === localStorage.getItem('uuid') ? <button type="submit" className="btn btn-success">{formButton[language]['avancar']}</button> : ''}                            
                            <button type="button" className="btn btn-danger" style={{marginRight: '10px'}} onClick={ () => navigate(-1) }>{formButton[language]['voltar']}</button>                        
                        </div>
                    </div>
                </form>

                <div className="modal fade" id="passModal" tabIndex="-1" role="dialog" aria-labelledby="passModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="passModalLabel">{profileModalTitle[language]}</h5>
                        <button type="button" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'transparent'}}>
                        x
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-4">{profileModalInputTitle[language]['senha']}</label>
                            <div className="col-sm-8"><input name="password" type="password" className="form-control" onChange={handlePassword} value={password} /></div>
                        </div>
                        <div className="mb-3 row">
                            <label className="form-label col-form-label col-sm-4">{profileModalInputTitle[language]['confirme_senha']}</label>
                            <div className="col-sm-8"><input name="password1" type="password" className="form-control" onChange={handlePassword} value={password1} /></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-success" onClick={onSubmitPassword} defaultValue={formButton[language]['avancar']} />
                        <input type="button" className="btn btn-secondary" data-dismiss="modal" defaultValue={formButton[language]['voltar']} />                  
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
