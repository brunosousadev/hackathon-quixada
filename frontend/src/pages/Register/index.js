import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/speaker-volume.svg'

import './styles.css'

export default function Register({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    async function handleBack(event){
        event.preventDefault();

        history.push('/dashboard');
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

        history.push('/dashboard');
    }
    
    return (
        <form onSubmit={handleSubmit}>

            <h1>
                Analisar áudio do voo
            </h1>

            <label 
            id="thumbnail" 
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <input 
            id="flightNumber"
            placeholder="Numero do voo"
            value={name}
            onChange={event => setName(event.target.value)}
                />

            <input 
            id="date"
            placeholder="Data"
            value={email}
            onChange={event => setEmail(event.target.value)}
                />

            <input 
            id="origin"
            placeholder="Origem"
            value={password}
            onChange={event => setPassword(event.target.value)}
                />
            
            <input 
            id="destination"
            placeholder="Destino"
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