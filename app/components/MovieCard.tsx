'use client'

import { useState } from 'react'
import { Movie } from '../types/movie'

interface MovieCardProps {
    movie: Movie
    onSelect?: (id: string) => void
    showButton?: boolean
}

const FALLBACK_POSTER =
    'https://placehold.co/300x450/020617/22d3ee?text=Sin+Poster'

export default function MovieCard({
    movie,
    onSelect,
    showButton = false,
}: MovieCardProps) {
    const [posterSrc, setPosterSrc] = useState(
        movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : FALLBACK_POSTER
    )

    return (
        <article
            className="movie-card rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => onSelect?.(movie.imdbID)}
        >
            <div className="relative bg-slate-950">
                <img
                    src={posterSrc}
                    alt={movie.Title}
                    onError={() => setPosterSrc(FALLBACK_POSTER)}
                    className="w-full h-80 object-cover poster-glow"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 border border-cyan-400/40 text-cyan-200 text-xs font-bold backdrop-blur">
                    {movie.Type}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-black text-white text-lg line-clamp-2 drop-shadow-lg">
                        {movie.Title}
                    </h3>

                    <p className="text-cyan-300 text-sm font-semibold mt-1">
                        {movie.Year}
                    </p>
                </div>
            </div>

            {showButton && (
                <div className="p-4">
                    <button className="w-full neon-button text-white py-3 rounded-xl font-bold">
                        Ver detalle
                    </button>
                </div>
            )}
        </article>
    )
}