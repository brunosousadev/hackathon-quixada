import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'

import './styles.css'

export default function Dashboard() {
    const [itens, setItem] = useState([]);

    useEffect(() => {
        async function loadItens() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

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
                            <strong>{item.firstname}</strong>
                            <span>{item.price}</span>
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