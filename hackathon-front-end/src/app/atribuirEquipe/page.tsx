"use client";
import { useState, useEffect } from 'react';
import api from "../../../services/api";
import { IEquipesData } from "../../../interfaces/IEquipes";
import { IAvaliadorData } from "../../../interfaces/IAvaliador";

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

export default function AtribuirAvaliador() {
    const [avaliadores, setAvaliadores] = useState<IAvaliadorData[]>([]);
    const [equipes, setEquipes] = useState<IEquipesData[]>([]);
    const [avaliadorId, setAvaliadorId] = useState<IAvaliadorData['id']>();
    const [equipeId, setEquipeId] = useState<IEquipesData['id']>();
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            const avaliadoresResponse = await api.get<IAvaliadorData[]>('api/avaliadores');
            setAvaliadores(avaliadoresResponse.data);

            const equipesResponse = await api.get<IEquipesData[]>('api/equipes');
            setEquipes(equipesResponse.data);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!avaliadorId || !equipeId) {
            setError('Por favor, selecione um avaliador e uma equipe.');
            return;
        }

        try {
            await api.put(`api/equipes/atribuir/${equipeId}`, {
                avaliadorId
            });
            alert('Avaliador atribuído com sucesso!');
            setError(''); // Limpar mensagem de erro em caso de sucesso
        } catch (error) {
            setError('Erro ao atribuir avaliador à equipe. Por favor, tente novamente.');
        }
    }

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo}/>
            <h1 style={styles.title}>Atribuir Avaliador a Equipe</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <select
                    value={avaliadorId}
                    onChange={(e) => setAvaliadorId(Number(e.target.value))}
                    style={styles.input}
                >
                    <option value="">Selecione um Avaliador</option>
                    {avaliadores.map((avaliador) => (
                        <option key={avaliador.id} value={avaliador.id}>
                            {avaliador.nome}
                        </option>
                    ))}
                </select>
                <select
                    value={equipeId}
                    onChange={(e) => setEquipeId(Number(e.target.value))}
                    style={styles.input}
                >
                    <option value="">Selecione uma Equipe</option>
                    {equipes.map((equipe) => (
                        <option key={equipe.id} value={equipe.id}>
                            {equipe.nome}
                        </option>
                    ))}
                </select>
                {error && <div style={styles.error}>{error}</div>}
                <button type="submit" style={styles.button}>
                    Atribuir
                </button>
            </form>
        </div>
    );
}