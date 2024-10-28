"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import Trabalho from "@/types/trabalho";
 
export default function Categoria({ params }: { params: Promise<{ categoria: string }> }) {
    const [trabalhos, setTrabalhos] = useState<Trabalho[]>([]);
    const [categoria, setCategoria] = useState<string | null>(null);
 
    useEffect(() => {
        const fetchCategoria = async () => {
            const parametros = await params;
            setCategoria(parametros.categoria);
        };
 
        fetchCategoria();
    }, [params]);
 
    useEffect(() => {
        if (categoria) {
            const fetchTrabalhos = async () => {
                try {
                    const response = await fetch(`/api/trabalhos?categoria=${categoria}`);
                    if (!response.ok) {
                        throw new Error("Erro na resposta da API");
                    }
                    const data = await response.json();
                    setTrabalhos(data);
                } catch (error) {
                    console.error("Erro ao buscar trabalhos:", error);
                }
            };
 
            fetchTrabalhos();
        }
    }, [categoria]);
 
    if (!categoria) {
        return <div>Carregando...</div>;
    }
 
    return (
        <main className="container mx-auto py-8 px-6">
            <h1 className="text-3xl font-bold mb-6">Trabalhos de {categoria}</h1>
            <ul className="space-y-4">
                {trabalhos.length > 0 ? (
                    trabalhos.map((trabalho) => (
                        <li key={trabalho.id} className="p-4 bg-cor-1 rounded shadow">
                            <h2 className="text-xl font-semibold">{trabalho.titulo}</h2>
                            <p>Autor: {trabalho.autor}</p>
                            <p>Semestre: {trabalho.semestre}</p>
                            <p>Nota: {trabalho.nota}</p>
                            <Link href={`/${categoria}/${trabalho.id}`} className="text-blue-500 hover:underline">
                                Ver detalhes
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="p-4 bg-cor-1 rounded shadow">Nenhum trabalho encontrado.</li>
                )}
            </ul>
        </main>
    );
}
 