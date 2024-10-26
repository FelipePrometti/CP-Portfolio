"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarTrabalho() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [nota, setNota] = useState("");
  const [categoria, setCategoria] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoTrabalho = {
        titulo,
        data,
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
    <main>
      <h1>Adicionar Trabalho</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
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
        <button type="submit">
          Adicionar Trabalho
        </button>
      </form>
    </main>
  );
}
