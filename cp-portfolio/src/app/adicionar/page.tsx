"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarTrabalho() {
  const [autor, setAutor] = useState("");
  const [titulo, setTitulo] = useState("");
  const [semestre, setSemestre] = useState("");
  const [nota, setNota] = useState("");
  const [categoria, setCategoria] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoTrabalho = {
      autor,
      titulo,
      semestre,
      nota,
      categoria,
    };

    try {
      const response = await fetch("/api/trabalhos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoTrabalho),
      });

      if (response.ok) {
        router.push(`/${novoTrabalho.categoria}`);
      } else {
        console.error("Erro ao adicionar o trabalho");
      }
    } catch (erro) {
      console.log("Erro: ", erro);
    }
  };

  return (
    <main className="bg-gradient-to-r from-cor-1 to-cor-2 shadow-lg py-4 m-10 p-3">
      <h1 className="text-center font-bold text-white mb-5">Adicionar Trabalho</h1>
      <form onSubmit={handleSubmit} className="flex justify-evenly">
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <select
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
        >
          <option value="1">1°</option>
          <option value="2">2°</option>
        </select>
        <input
          type="number"
          placeholder="Nota"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="checkpoint">CheckPoint</option>
          <option value="globalsolution">Global Solution</option>
          <option value="challengersprint">Challenger Sprint</option>
        </select>
        <button type="submit" className="bg-white w-36 h-10 rounded-lg">
          Adicionar Trabalho
        </button>
      </form>
    </main>
  );
}
