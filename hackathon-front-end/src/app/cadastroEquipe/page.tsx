"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../services/api";
import { IEquipesData } from "../../../interfaces/IEquipes";

interface IAvaliador {
    id: number;
    nome: string;
}

export default function NewEquipe() {
    const router = useRouter();
    const [avaliadores, setAvaliadores] = useState<IAvaliador[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvaliadores = async () => {
            try {
                const response = await api.get("/api/avaliadores");
                setAvaliadores(response.data);
            } catch (error) {
                setError("Erro ao carregar avaliadores.");
            }
        };
        fetchAvaliadores();
    }, []);

    const formik = useFormik({
        initialValues: {
            nome: "",
            avaliador_id: 0,
        },
        validationSchema: Yup.object({
            nome: Yup.string()
                .required("Nome da equipe é obrigatório"),
            avaliador_id: Yup.number()
                .required("Avaliador é obrigatório")
                .min(1, "Selecione um avaliador válido"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setError(null);
            try {
                await api.post("/api/equipes", values);
                router.push("/");
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data.message || "Erro ao criar equipe. Por favor, tente novamente.");
                } else {
                    setError("Erro ao criar equipe. Por favor, tente novamente.");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo} />
            <h1 style={styles.title}>Criar nova equipe</h1>
            <form onSubmit={formik.handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome da Equipe"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={styles.input}
                />
                {formik.touched.nome && formik.errors.nome ? (
                    <div style={styles.error}>{formik.errors.nome}</div>
                ) : null}
                <select
                    name="avaliador_id"
                    value={formik.values.avaliador_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={styles.input}
                >
                    <option value="">Selecione o Avaliador</option>
                    {avaliadores.map((avaliador) => (
                        <option key={avaliador.id} value={avaliador.id}>
                            {avaliador.nome}
                        </option>
                    ))}
                </select>
                {formik.touched.avaliador_id && formik.errors.avaliador_id ? (
                    <div style={styles.error}>{formik.errors.avaliador_id}</div>
                ) : null}
                {error && <div style={styles.error}>{error}</div>}
                <button type="submit" style={styles.button} disabled={formik.isSubmitting}>
                    Criar equipe
                </button>
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
