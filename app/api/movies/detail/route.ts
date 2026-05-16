import { NextResponse } from 'next/server'
import axios from 'axios'

const API_KEY = process.env.OMDB_API_KEY

export async function GET(request: Request) {
    try {
        if (!API_KEY) {
            return NextResponse.json(
                { Response: 'False', Error: 'Falta configurar OMDB_API_KEY' },
                { status: 500 }
            )
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { Response: 'False', Error: 'Falta el ID de la película o serie' },
                { status: 400 }
            )
        }

        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        )

        return NextResponse.json(response.data)
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { Response: 'False', Error: 'Error al obtener el detalle' },
            { status: 500 }
        )
    }
}