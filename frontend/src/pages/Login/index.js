import React, {useState, useEffect} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
           const token = localStorage.getItem('token');
           if(token){
            history.push('/dashboard');
           }
    },[])

    async function handleSubmit(event){
        event.preventDefault();        
        const response = await api.post('/sessions', { email: user, password });        
        console.log(response.data);

        const { token, email } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        history.push('/dashboard');
    }

    async function handleRegister(event){
        event.preventDefault();

        history.push('/userregister');
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
                <p>
                    <button onClick={handleRegister} className="btn">Cadastrar</button>

                    <button className="btn" type="submit">Entrar</button>
                </p>
                
            </form>
        </>
    )
}