"use client";
import { useEffect, useState } from 'react';
import api from "../../../services/api";
import { IEquipesData } from "../../../interfaces/IEquipes";

export default function ListaEquipes() {
    const [equipes, setEquipes] = useState<IEquipesData[]>([]); // Corrigido para IEquipesData[]

    useEffect(() => {
        async function fetchEquipes() {
            try {
                const response = await api.get('/api/equipes');
                setEquipes(response.data);
            } catch (error) {
                console.error('Erro ao buscar equipes:', error);
            }
        }
        fetchEquipes();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/equipes/${id}`);
            setEquipes(equipes.filter((equipe) => equipe.id !== id));
        } catch (error) {
            console.error('Erro ao excluir equipe:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Equipes</h1>
            <ul className="space-y-4">
                {equipes.map((equipe) => (
                    <li key={equipe.id} className="flex justify-between items-center p-4 bg-white shadow rounded">
                        <span>{equipe.nome}</span>
                        <button
                            onClick={() => handleDelete(equipe.id)}
                            className="bg-red-500 text-white p-2 rounded"
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
