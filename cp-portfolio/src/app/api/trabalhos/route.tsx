import { NextResponse, NextRequest } from "next/server";
import Trabalho from "@/types/trabalho";
import trabalhos from "@/data/trabalhos";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { titulo, data, nota, categoria } = body;

        const novoTrabalho: Trabalho = {
            id: trabalhos.length + 1,
            titulo,
            data,
            nota,
            categoria,
        }

        trabalhos.push(novoTrabalho);
        return NextResponse.json(novoTrabalho, { status: 201 });
    } catch (erro) {
        return NextResponse.json(erro, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const id = searchParams.get("id");

    if (categoria && id) {

        const trabalho = trabalhos.find(
            (t) => t.categoria === categoria && t.id === Number(id)
        );
        return trabalho ? NextResponse.json(trabalho)
                        : NextResponse.json({ error: "Trabalho não encontrado" }, { status: 404 });
    } else if (categoria) {

        const trabalhosDaCategoria = trabalhos.filter(
            (t) => t.categoria === categoria
        );
        return NextResponse.json(trabalhosDaCategoria);

    } else {
        return NextResponse.json(trabalhos);
    }
}