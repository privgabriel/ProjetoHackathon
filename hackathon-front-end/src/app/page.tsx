"use client";
import { useEffect, useState } from 'react';
import api from "../../services/api";

export default function Home() {
    const [totalEquipes, setTotalEquipes] = useState(0);
    const [totalAvaliadores, setTotalAvaliadores] = useState(0);
    const [totalNotas, setTotalNotas] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const equipesResponse = await api.get('/api/equipes');
            setTotalEquipes(equipesResponse.data.length);

            const avaliadoresResponse = await api.get('/api/avaliadores');
            setTotalAvaliadores(avaliadoresResponse.data.length);

            const notasResponse = await api.get('/api/avaliacoes');
            setTotalNotas(notasResponse.data.length);
        }
        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            <div style={styles.cardsContainer}>
                <Card title="Total de Equipes" count={totalEquipes} />
                <Card title="Total de Avaliadores" count={totalAvaliadores} />
                <Card title="Total de Notas Atribuídas" count={totalNotas} />
            </div>
        </div>
    );
}

function Card({ title, count }) {
    return (
        <div style={styles.card}>
            <h2 style={styles.cardTitle}>{title}</h2>
            <p style={styles.cardCount}>{count}</p>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    cardsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
        '@media (minWidth: 768px)': {
            gridTemplateColumns: '1fr 1fr 1fr'
        }
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#007BFF'
    },
    cardCount: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333'
    }
};


