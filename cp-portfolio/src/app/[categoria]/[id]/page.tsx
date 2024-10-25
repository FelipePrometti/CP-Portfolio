"use client";

import { useEffect, useState } from "react";
import Trabalho from "@/types/trabalho";

export default function TrabalhoDetalhes({ params }: { params: Promise<{ categoria: string; id: string }> }) {
    const [trabalho, setTrabalho] = useState<Trabalho | null>(null);
    const [categoria, setCategoria] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        const fetchParams = async () => {
            const parametros = await params;
            setCategoria(parametros.categoria);
            setId(parametros.id);
        };

        fetchParams();
    }, [params]);

    useEffect(() => {
        if (categoria && id) {
            const fetchTrabalho = async () => {
                try {
                    const response = await fetch(`/api/trabalhos?categoria=${categoria}&id=${id}`);
                    if (!response.ok) {
                        throw new Error("Erro na resposta da API");
                    }
                    const data = await response.json();
                    setTrabalho(data);
                } catch (error) {
                    console.error("Erro ao buscar trabalho:", error);
                }
            };

            fetchTrabalho();
        }
    }, [categoria, id]);

    if (!trabalho) {
        return <p>Carregando...</p>;
    }

    return (
        <main className="container mx-auto py-8 px-6">
            <h1 className="text-3xl font-bold mb-6">{trabalho.titulo}</h1>
            <p>Data: {trabalho.data}</p>
            <p>Nota: {trabalho.nota}</p>
            <p>Categoria: {trabalho.categoria}</p>
        </main>
    );
}
