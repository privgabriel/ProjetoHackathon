"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { IAvaliadorData } from "../../../interfaces/IAvaliador";

export default function ListarAvaliadores() {
    const router = useRouter();
    const [avaliadores, setAvaliadores] = useState<IAvaliadorData[]>([]);

    useEffect(() => {
        api.get("/api/avaliadores").then((response) => {
            setAvaliadores(response.data);
        });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/avaliadores/${id}`);
            const newAvaliadores = avaliadores.filter((avaliador) => avaliador.id !== id);
            setAvaliadores(newAvaliadores);
        } catch (error: any) {
            alert("Erro ao deletar avaliador. Por favor, tente novamente.");
        }
    }

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo} />
            <h1 style={styles.title}>Avaliadores</h1>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Login</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {avaliadores.map((avaliador) => (
                    <tr key={avaliador.id}>
                        <td style={styles.tableCell}>{avaliador.nome}</td>
                        <td style={styles.tableCell}>{avaliador.login}</td>
                        <td style={styles.tableCell}>
                            <button onClick={() => handleDelete(avaliador.id)} style={styles.deleteButton}>Deletar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

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
