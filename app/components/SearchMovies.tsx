'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Movie, MovieDetail } from '../types/movie'
import MovieModal from './MovieModal'
import MovieCard from './MovieCard'

interface OmdbSearchResponse {
    Search?: Movie[]
    totalResults?: string
    Response: string
    Error?: string
}

export default function SearchMovies() {
    const [query, setQuery] = useState('batman')
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)

    useEffect(() => {
        if (query.trim().length < 3) {
            const timer = setTimeout(() => {
                setMovies([])
                setError('Escribe al menos 3 caracteres para buscar.')
            }, 0)

            return () => clearTimeout(timer)
        }

        const fetchMovies = async () => {
            try {
                setLoading(true)
                setError('')

                const response = await axios.get<OmdbSearchResponse>(
                    `/api/movies/search?query=${encodeURIComponent(query)}`
                )

                if (response.data.Response === 'True' && response.data.Search) {
                    setMovies(response.data.Search)
                } else {
                    setMovies([])
                    setError(response.data.Error || 'No se encontraron resultados.')
                }
            } catch (err) {
                console.error(err)
                setError('Ocurrió un error al buscar películas o series.')
            } finally {
                setLoading(false)
            }
        }

        const timer = setTimeout(() => {
            fetchMovies()
        }, 600)

        return () => clearTimeout(timer)
    }, [query])

    const getMovieDetail = async (id: string) => {
        try {
            setError('')

            const response = await axios.get<MovieDetail>(
                `/api/movies/detail?id=${encodeURIComponent(id)}`
            )

            if (response.data.Response === 'False') {
                setError('No se pudo obtener el detalle de la película o serie.')
                return
            }

            setSelectedMovie(response.data)
        } catch (err) {
            console.error(err)
            setError('No se pudo cargar el detalle de la película.')
        }
    }

    return (
        <section className="mt-10 glass-card neon-border rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                    <p className="text-pink-300 font-semibold uppercase tracking-widest text-sm mb-2">
                        Renderizado del cliente
                    </p>

                    <h2 className="text-3xl md:text-4xl font-black neon-gradient-text">
                        🔎 Explorar películas y series
                    </h2>

                    <p className="text-gray-400 mt-3 max-w-2xl">
                        Esta sección usa CSR porque los resultados cambian mientras el
                        usuario escribe, sin recargar la página.
                    </p>
                </div>

                <div className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-400/40 text-pink-200 font-bold shadow-[0_0_18px_rgba(236,72,153,0.25)]">
                    CSR Interactivo
                </div>
            </div>

            <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-300 text-xl">
                    🎥
                </span>

                <input
                    type="text"
                    placeholder="Busca una película o serie: Batman, Suits, Avengers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-950/80 border border-cyan-400/40 text-white text-lg outline-none focus:border-pink-400 focus:shadow-[0_0_25px_rgba(236,72,153,0.35)] transition placeholder:text-gray-500"
                />
            </div>

            {loading && (
                <div className="flex justify-center mt-8">
                    <div className="px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                        Buscando resultados...
                    </div>
                </div>
            )}

            {!loading && error && (
                <p className="text-center text-red-300 mt-6 font-semibold">
                    {error}
                </p>
            )}

            {!loading && movies.length > 0 && (
                <div className="mt-6 text-gray-400 text-sm">
                    Resultados encontrados para:{' '}
                    <span className="text-cyan-300 font-semibold">{query}</span>
                </div>
            )}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        showButton={true}
                        onSelect={getMovieDetail}
                    />
                ))}
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </section>
    )
}