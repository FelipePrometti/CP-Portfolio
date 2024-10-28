"use client";
 
import { useEffect, useState } from "react";
import Trabalho from "@/types/trabalho";
 
export default function TrabalhoDetalhes({ params }: { params: Promise<{ categoria: string; id: string }> }) {
    const [trabalho, setTrabalho] = useState<Trabalho | null>(null);
    const [categoria, setCategoria] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [editando, setEditando] = useState(false);
 
    const buscarTrabalho = async () => {
        if (categoria && id) {
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
        }
    };
 
    const atualizarTrabalho = async () => {
        if (trabalho && categoria && id) {
            try {
                const response = await fetch(`/api/trabalhos`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        categoria,
                        titulo: trabalho.titulo,
                        autor: trabalho.autor,
                        semestre: trabalho.semestre,
                        nota: trabalho.nota,
                    }),
                });
 
                if (!response.ok) {
                    throw new Error("Erro ao atualizar trabalho");
                }
                const trabalhoAtualizado = await response.json();
                setTrabalho(trabalhoAtualizado);
                setEditando(false);
            } catch (error) {
                console.error("Erro ao atualizar trabalho:", error);
            }
        }
    };
 
    useEffect(() => {
        const buscarParametros = async () => {
            const parametros = await params;
            setCategoria(parametros.categoria);
            setId(parametros.id);
        };
 
        buscarParametros();
    }, [params]);
 
    useEffect(() => {
        buscarTrabalho();
    }, [categoria, id]);
 
    if (!trabalho) {
        return <p>Carregando...</p>;
    }
 
    return (
<main className="container mx-auto py-8 px-6">
<h1 className="text-3xl font-bold mb-6">{editando ? "Editando Trabalho" : trabalho.titulo}</h1>
            {editando ? (
<>
<label>
                        Título:
<input
                            type="text"
                            value={trabalho.titulo}
                            onChange={(e) => setTrabalho({ ...trabalho, titulo: e.target.value })}
                        />
</label>
<label>
                        Autor:
<input
                            type="text"
                            value={trabalho.autor}
                            onChange={(e) => setTrabalho({ ...trabalho, autor: e.target.value })}
                        />
</label>
<label>
                        Semestre:
<input
                            type="text"
                            value={trabalho.semestre}
                            onChange={(e) => setTrabalho({ ...trabalho, semestre: e.target.value })}
                        />
</label>
<label>
                        Nota:
<input
                            type="number"
                            value={trabalho.nota}
                            onChange={(e) => setTrabalho({ ...trabalho, nota: Number(e.target.value) })}
                        />
</label>
<button onClick={atualizarTrabalho} className="mt-4 bg-blue-500 text-white p-2 rounded">
                        Salvar Alterações
</button>
<button onClick={() => setEditando(false)} className="mt-4 bg-gray-500 text-white p-2 rounded">
                        Cancelar
</button>
</>
            ) : (
<>
<p>Autor: {trabalho.autor}</p>
<p>Semestre: {trabalho.semestre}</p>
<p>Nota: {trabalho.nota}</p>
<p>Categoria: {trabalho.categoria}</p>
<button onClick={() => setEditando(true)} className="mt-4 bg-green-500 text-white p-2 rounded">
                        Editar
</button>
</>
            )}
</main>
    );
}