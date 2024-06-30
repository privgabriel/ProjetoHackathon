"use client";
import { useEffect, useState } from 'react';
import api from "../../../services/api";
import { IEquipesData } from "../../../interfaces/IEquipes";

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
    table: {
        minWidth: '80%',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
        borderCollapse: 'collapse'
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
        textAlign: 'left',
        color: '#000'  // Mudança de cor para melhor contraste
    },
    deleteButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#ff4d4d',  // Cor vermelha para o botão de deletar
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    deleteButtonHover: {
        backgroundColor: '#cc0000'
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold'
    }
};

export default function ListaEquipes() {
    const [equipes, setEquipes] = useState<IEquipesData[]>([]);

    useEffect(() => {
        async function fetchEquipes() {
            try {
                const response = await api.get('api/equipes');
                setEquipes(response.data);
            } catch (error) {
                console.error('Erro ao buscar equipes:', error);
            }
        }
        fetchEquipes();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`api/equipes/${id}`);
            setEquipes(equipes.filter((equipe) => equipe.id !== id));
        } catch (error) {
            console.error('Erro ao excluir equipe:', error);
        }
    };

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo}/>
            <h1 style={styles.title}>Lista de Equipes</h1>
            <table style={styles.table}>
                <thead style={styles.tableHeader}>
                <tr>
                    <th style={styles.tableCell}>Nome</th>
                    <th style={styles.tableCell}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {equipes.map((equipe) => (
                    <tr key={equipe.id}>
                        <td style={styles.tableCell}>{equipe.nome}</td>
                        <td style={styles.tableCell}>
                            <button
                                onClick={() => handleDelete(equipe.id)}
                                style={styles.deleteButton}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
