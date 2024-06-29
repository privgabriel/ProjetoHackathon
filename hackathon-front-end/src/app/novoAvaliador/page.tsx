"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import { IAvaliadorData } from "../../../interfaces/IAvaliador";
import {router} from "next/client";

export default function newAvaliador() {
    const router = useRouter();
    const [FormDataAvaliador, setFormDataAvaliador] = useState<IAvaliadorData>({
        nome: "",
        login: "",
        senha: ""
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormDataAvaliador({
            ...FormDataAvaliador,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/api/avaliadores", FormDataAvaliador);
            router.push("/");
        } catch (error) {
            console.log("Erro ao criar avaliador:", error);
        }
    }

    return (
        <div>
            <h1>Criar novo avaliador</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={FormDataAvaliador.nome}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="login"
                    placeholder="Login"
                    value={FormDataAvaliador.login}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={FormDataAvaliador.senha}
                    onChange={handleChange}
                />
                <button type="submit">Criar avaliador</button>
            </form>
        </div>
    );
}


