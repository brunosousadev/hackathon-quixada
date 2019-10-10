import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import usericon from '../../assets/user-icon128.svg'

import './styles.css'

export default function UserRegister({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    async function handleBack(event){
        event.preventDefault();

        history.push('/');
    }

    async function handleSubmit(event){
        event.preventDefault();

        // const data = new FormData();
        // const user_id = localStorage.getItem('user');

        // data.append('name', name);
        // data.append('email', email);
        // data.append('password', password);

        // await api.post('/spots', data, {
        //     headers: { user_id }
        // })

        history.push('/');
    }
    
    return (
        <form onSubmit={handleSubmit}>

            <h1>
                Cadastrar usuário
            </h1>

            <label id="image" >
                <img src={usericon} alt="Select img"/>
            </label>

            <input 
            id="name"
            placeholder="Nome do  usuário"
            value={name}
            onChange={event => setName(event.target.value)}
                />

            <input 
            id="email"
            placeholder="Email do usuário"
            value={email}
            onChange={event => setEmail(event.target.value)}
                />

            <input 
            id="password"
            placeholder="Crie sua senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
                />
            
            <input 
            id="passwordConfimation"
            placeholder="Confirme sua senha"
            value={password}
            onChange={event => setPassword(event.target.value)}
                />
            

            <p>
            <button onClick={handleBack} className="btn">Cancelar</button>
            <button type="submit" className="btn">Cadastrar</button>
            </p>

        </form>
    )
}