import React, {useState} from 'react';
import api from '../../services/api';

export default function Recover({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
    
        const response = await api.post('/sessions', { email })

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    async function handleSubmit(event){
        event.preventDefault();

        history.push('/');
    }

    return (
        <>
            <h1>
            Digite seu e-mail de recuperação
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    id="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    />
                <p>
                    <button onClick={handleSubmit} className="btn">Cancelar</button>
                
                    <button className="btn" type="submit">Enviar</button>
                </p>
            </form>
        </>
    )
}