"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../services/api";
import { ILogin } from "../../../interfaces/ILogin";
import axios from "axios";

interface ILogin {
    token: string;
}

export default function LoginPage() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!login || !senha) {
            setError("Nome de usuário e senha são obrigatórios");
            return;
        }

        try {
            const response = await axios.post<ILogin>("http://localhost:3001/api/login", { login, senha });
            const { token } = response.data;
            localStorage.setItem("token", token);
            router.push("/");
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Erro ao fazer login. Verifique suas credenciais.");
            }
            console.log("Erro ao fazer login:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            <input
                type="text"
                placeholder="Nome de usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}>
                Entrar
            </button>
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#3F8EBF',
        padding: '20px'
    },
    title: {
        color: '#ffffff',
        marginBottom: '20px',
        fontSize: '24px'
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        width: '250px',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s ease'
    },
    buttonHover: {
        backgroundColor: '#0056b3'
    },
    error: {
        color: 'red',
        marginTop: '10px',
        fontSize: '14px',
        backgroundColor: '#ffe0e0',
        padding: '10px',
        borderRadius: '4px',
        width: '100%',
        textAlign: 'center'
    }
};
