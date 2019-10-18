import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import usericon from '../../assets/user-icon128.svg'

import './styles.css'

export default function UserRegister({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmerPassword, setConfirmerPassword] = useState('');
    const [error, setError] = useState('');

    async function handleBack(event) {
        event.preventDefault();

        history.push('/');
    }

    async function handleSubmit(event) {
        event.preventDefault();                
        if( password === confirmerPassword){
            const data = new FormData();
            data.append('email', email);
            data.append('password', password);    
            await api.post('/users', data);  
            history.push('/');         
        } else{
            setError('Senhas diferentes');
        } 
      
          
    }

    return (
        <form onSubmit={handleSubmit}>

            <h1>
                Cadastrar usuário
            </h1>

            <label id="image" >
                <img src={usericon} alt="Select img" />
            </label>

            <input
                id="email"
                placeholder="Email do usuário"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <input
                id="password"
                type="password" 
                placeholder="Senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />

            <input
                type="password" 
                id="passwordConfimation"
                placeholder="Confirme sua senha"
                value={confirmerPassword}
                onChange={event => setConfirmerPassword(event.target.value)}
            />
                <h5>{error}</h5>
            <p>
                <button onClick={handleBack} className="btn">Cancelar</button>
                <button type="submit" className="btn">Cadastrar</button>
            </p>

        </form>
    )
}