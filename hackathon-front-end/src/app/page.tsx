"use client";
import { useEffect, useState } from 'react';
import api from "../../services/api";
import Card from '../components/Card';

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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Total de Equipes" count={totalEquipes} />
                <Card title="Total de Avaliadores" count={totalAvaliadores} />
                <Card title="Total de Notas Atribuídas" count={totalNotas} />
            </div>
        </div>
    );
}
