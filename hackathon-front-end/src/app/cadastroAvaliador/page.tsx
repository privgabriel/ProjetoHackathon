"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../services/api";
import { IAvaliadorData } from "../../../interfaces/IAvaliador";
import {useState} from "react";

export default function NewAvaliador() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            nome: "",
            login: "",
            senha: "",
        },
        validationSchema: Yup.object({
            nome: Yup.string()
                .required("Nome é obrigatório"),
            login: Yup.string()
                .required("Login é obrigatório"),
            senha: Yup.string()
                .required("Senha é obrigatória")
                .min(6, "Senha deve ter pelo menos 6 caracteres"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setError(null);
            try {
                await api.post("/api/avaliadores", values);
                router.push("/");
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setError(error.response.data.message || "Erro ao criar avaliador. Por favor, tente novamente.");
                } else {
                    setError("Erro ao criar avaliador. Por favor, tente novamente.");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div style={styles.container}>
            <img src="/hackathon_logo.png" alt="Hackathon Logo" style={styles.logo} />
            <h1 style={styles.title}>Criar novo avaliador</h1>
            <form onSubmit={formik.handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={styles.input}
                />
                {formik.touched.nome && formik.errors.nome ? (
                    <div style={styles.error}>{formik.errors.nome}</div>
                ) : null}
                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={styles.input}
                />
                {formik.touched.login && formik.errors.login ? (
                    <div style={styles.error}>{formik.errors.login}</div>
                ) : null}
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formik.values.senha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={styles.input}
                />
                {formik.touched.senha && formik.errors.senha ? (
                    <div style={styles.error}>{formik.errors.senha}</div>
                ) : null}
                <button type="submit" style={styles.button} disabled={formik.isSubmitting}>
                    Criar avaliador
                </button>
                {error && <p style={styles.error}>{error}</p>}
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
