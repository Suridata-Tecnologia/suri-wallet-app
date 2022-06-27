/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useNavigate  } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { logout } from "../../services/auth";
import './styles.css';

const Menu = (props) => {
    const navigate = useNavigate(); 

    const user_id = localStorage.getItem('uuid');

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <img src={`https://portal.suridata.com.br/img/storage/${localStorage.getItem('logo') || 'suridata_logo_v4.png'}`} style={{ margin: "5px 10px" }} width="57" height="47" />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <label className="nav-link" onClick={() => {}}>Inicio</label>
                </li>

                <li className="nav-item active">
                    <label className="nav-link" onClick={() => navigate(`/profile/${localStorage.getItem('uuid')}`)}>Perfil</label>
                </li>

                {localStorage.getItem('rules') === 'corretor' && 
                    <li className="nav-item">
                        <label className="nav-link" onClick={() => navigate(`/contestations`)}>Contestações</label>
                    </li>
                }

                {localStorage.getItem('rules') === 'titular' || localStorage.getItem('rules') === 'beneficiario' ? 
                    <>
                        <li className="nav-item">
                            <label className="nav-link" onClick={() => navigate(`/dashboard/${user_id}`)}>Utilização</label>
                        </li>
                        
                        <li className="nav-item">
                            <label className="nav-link" onClick={() => navigate(`/contestations/${user_id}`)}>Contestações</label>
                        </li>
                    </>
                    : ''
                }
                <li className="nav-item active">
                    <label className="nav-link" onClick={() => { logout(); navigate('/') }}>Sair</label>
                </li>
                </ul>                
            </div>
        </nav>
        </>
    );
};

export default Menu;
