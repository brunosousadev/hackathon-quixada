import React, {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
    
        // const response = await api.post('/sessions', { user })

        // const { _id } = response.data;

        // localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    async function handleButton(event){
        event.preventDefault();

        history.push('/register');
    }

    return (
        <>
            <h1>
            Iniciar sessão
            </h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="user">USUARIO *</label>
                <input
                    id="user"
                    placeholder="Digite aqui seu usuario"
                    value={user}
                    onChange={event => setUser(event.target.value)}
                    />

                <label htmlFor="senha">Senha *</label>
                <input 
                    type="password" 
                    id="passwd" 
                    placeholder="Digite aqui sua senha"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    />

                <a href="/recover">Esqueceu sua senha?</a>

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}