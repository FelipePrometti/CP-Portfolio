import { NextResponse, NextRequest } from "next/server";
import Trabalho from "@/types/trabalho";

const trabalhos: Trabalho[] = [];

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

export async function GET() {
    return NextResponse.json(trabalhos);
}