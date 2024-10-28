import { NextResponse, NextRequest } from "next/server";
import Trabalho from "@/types/trabalho";
import trabalhos from "@/data/trabalhos";
 
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { autor, titulo, data, nota, categoria } = body;
 
        const novoTrabalho: Trabalho = {
            id: trabalhos.length + 1,
            autor,
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
 
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, autor, titulo, data, nota, categoria } = body;
 
        const trabalhoAtualizado: Trabalho = {
            id,
            autor,
            titulo,
            data,
            nota,
            categoria,
        }
 
        const indiceTrabalho = trabalhos.findIndex(
            (t) => t.id === trabalhoAtualizado.id
        );
 
        if (indiceTrabalho !== -1) {
            trabalhos[indiceTrabalho] = trabalhoAtualizado;
            return NextResponse.json(trabalhoAtualizado, { status: 200 });
        } else {
            return NextResponse.json({ error: "Trabalho não encontrado" }, { status: 404 });
        }
    } catch (erro) {
        return NextResponse.json(erro, { status: 500 });
    }
}