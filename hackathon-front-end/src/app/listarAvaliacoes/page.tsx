"use client";
import { useEffect, useState } from 'react';
import api from "../../../services/api";
import { IAvaliacoesData } from "../../../interfaces/IAvaliacoes";
import { IEquipesData } from "../../../interfaces/IEquipes";
import { IAvaliadorData } from "../../../interfaces/IAvaliador";
import {black} from "next/dist/lib/picocolors";
import {id} from "postcss-selector-parser";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
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
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '20px',
        marginRight: '10px'
    },
    listItem: {
        color: "#000",
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
    },
    emptyMessage: {
        color: '#ffffff',
        marginTop: '20px',
        fontSize: '18px'
    }
};

export default function ListaAvaliacoes() {
    const [avaliacoes, setAvaliacoes] = useState<IAvaliacoesData[]>([]);
    const [equipes, setEquipes] = useState<IEquipesData[]>([]);
    const [avaliadores, setAvaliadores] = useState<IAvaliadorData[]>([]);
    const [filter, setFilter] = useState({ equipeId: '', avaliadorId: '' });

    useEffect(() => {
        async function fetchData() {
            try {
                const [avaliacoesResponse, equipesResponse, avaliadoresResponse] = await Promise.all([
                    api.get('api/avaliacoes', { params: filter }),
                    api.get('api/equipes'),
                    api.get('api/avaliadores')
                ]);
                setAvaliacoes(avaliacoesResponse.data);
                setEquipes(equipesResponse.data);
                setAvaliadores(avaliadoresResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        fetchData();
    }, [filter]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const getEquipeNome = (equipeId: string) => {
        const equipe = equipes.find(id);
        return equipe ? equipe.nome : 'Equipe desconhecida';
    };

    const getAvaliadorNome = (avaliadorId: string) => {
        const avaliador = avaliadores.find(id);
        return avaliador ? avaliador.nome : 'Avaliador desconhecido';
    };

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo} />
            <h1 style={styles.title}>Lista de Avaliações</h1>
            <div>
                <input
                    type="text"
                    name="equipeId"
                    placeholder="Filtrar por Equipe"
                    value={filter.equipeId}
                    onChange={handleFilterChange}
                    style={styles.input}
                />
                <input
                    type="text"
                    name="avaliadorId"
                    placeholder="Filtrar por Avaliador"
                    value={filter.avaliadorId}
                    onChange={handleFilterChange}
                    style={styles.input}
                />
            </div>
            <ul style={{ width: '80%' }}>
                {avaliacoes.length > 0 ? (
                    avaliacoes.map((avaliacao) => (
                        <li key={avaliacao.id} style={styles.listItem}>
                            <p><strong>Equipe:</strong> {getEquipeNome(avaliacao.equipeId)}</p>
                            <p><strong>Avaliador:</strong> {getAvaliadorNome(avaliacao.avaliadorId)}</p>
                            <p><strong>Notas:</strong> {JSON.stringify(avaliacao.notas)}</p>
                        </li>
                    ))
                ) : (
                    <p style={styles.emptyMessage}>Nenhuma avaliação encontrada.</p>
                )}
            </ul>
        </div>
    );
}
