"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../../services/api";
import { ILogin } from "../../../interfaces/ILogin";

export default function LoginPage() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!login || !senha) {
            setError("Nome de usuário e senha são obrigatórios");
            return;
        }

        try {
            const response = await api.post("/login", { login, senha });
            const user: ILogin = response.data;
            router.push("/");
        } catch (error) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
            console.log("Erro ao fazer login:", error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#000" }}>
            <h1 style={{ color: "#fff" }}>Login</h1>
            <input
                type="text"
                placeholder="Nome de usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                style={{
                    margin: "10px 0",
                    padding: "10px",
                    fontSize: "16px",
                    width: "200px",
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                }}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{
                    margin: "10px 0",
                    padding: "10px",
                    fontSize: "16px",
                    width: "200px",
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                }}
            />
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Entrar
            </button>
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
    );
}
