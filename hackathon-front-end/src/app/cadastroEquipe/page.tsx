"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { IEquipesData } from "../../../interfaces/IEquipes";
import {router} from "next/client";

export default function NewEquipe() {
    const router = useRouter();
    const [FormDataEquipe, setFormDataEquipe] = useState<IEquipesData>({
        nome: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormDataEquipe({
            ...FormDataEquipe,
            [e.target.name]: e.target.value
        });
        setError(null);  // Limpa a mensagem de erro ao alterar os campos
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!FormDataEquipe.nome) {
            setError("Todos os campos são obrigatórios.");
            return;
        }
        try {
            await api.post("/api/equipes", FormDataEquipe);
            router.push("/");
        } catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Erro ao criar equipe. Por favor, tente novamente.");
            } else {
                setError("Erro ao criar equipe. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo} />
            <h1 style={styles.title}>Criar nova equipe</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome da Equipe"
                    value={FormDataEquipe.nome}
                    onChange={handleChange}
                    style={styles.input}
                />
                {error && <div style={styles.error}>{error}</div>}
                <button type="submit" style={styles.button}>Criar equipe</button>
            </form>
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
    logo: {
        width: '200px',
        marginBottom: '20px',
        borderRadius: '10px'
    },
    title: {
        color: '#ffffff',
        marginBottom: '20px',
        fontSize: '24px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        width: '250px',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #3F8EBF',
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