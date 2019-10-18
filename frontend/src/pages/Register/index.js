import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import speaker from '../../assets/speaker-volume.svg'

import './styles.css'

export default function Register({ history }) {
    const [flightNumber, setFlightNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [audio, setAudio] = useState('');


    const [startDate, setStartDate] = useState('');

    async function handleBack(event) {
        event.preventDefault();

        history.push('/dashboard');
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const email = localStorage.getItem('email');

        data.append('identification',flightNumber);
        data.append('origin',origin);
        data.append('destiny',destination);
        data.append('date',setStartDate);
        data.append('audio_file',audio);
        data.append('email', email);
        
        const response  = await api.post('/flights', data);
        console.log(response.error);

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>

            <h1>
                Analisar áudio do voo
            </h1>

            <label
                id="audio"
                className="audio"
                    >
                <input type="file"                    
                onChange={event => setAudio(event.target.files[0])} />
                <img src={speaker} alt="Selecionar o Áudio" />
            </label>

            <input
                id="flightNumber"
                placeholder="Numero do voo"
                value={flightNumber}
                onChange={event => setFlightNumber(event.target.value)}
            />

            <input
                id="startDate"
                placeholder="Data"
                value={startDate}
                onChange={event =>setStartDate(event.target.value)}
            />

            <input
                id="origin"
                placeholder="Origem"
                value={origin}
                onChange={event => setOrigin(event.target.value)}
            />

            <input
                id="destination"
                placeholder="Destino"
                value={destination}
                onChange={event => setDestination(event.target.value)}
            />

            <p>
                <button onClick={handleBack} className="btn">Cancelar</button>
                <button type="submit" className="btn">Cadastrar</button>
            </p>

        </form>
    )
}