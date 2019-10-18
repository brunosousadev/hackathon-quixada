import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'

import './styles.css'

export default function Dashboard() {
    const [itens, setItem] = useState([]);
    
    useEffect(() => {
        async function loadItens() {
            const token = localStorage.getItem('token')

            const response = await api.get('/flights');
            console.log(response.data);
            setItem(response.data);
        }

        loadItens();
    }, []);


    return (
        <>
        <h1>
            Lista de Áudios
        </h1>
            <ul className="spot-list">
                {itens.map(item => (
                    <p>
                        <li key={item.id}>
                            <strong>{item.identification}</strong>
                            <span>{item.origin}</span>      
                            <a href={item.audioFileUrl} >Áudio</a>                      
                        </li>
                    </p>
                ))}
            </ul>

            <Link to="/register">
                <button className="btn">
                Adicionar
                </button>
            </Link>
        </>
    )
}