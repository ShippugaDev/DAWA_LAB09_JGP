import { MovieDetail } from '../types/movie'

interface MovieModalProps {
    movie: MovieDetail
    onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="relative glass-card neon-border rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>

                <div className="relative p-6 md:p-8">
                    <div className="flex justify-between items-start gap-4 mb-8">
                        <div>
                            <p className="text-cyan-300 font-semibold uppercase tracking-widest text-sm mb-2">
                                Detalle seleccionado
                            </p>

                            <h2 className="text-3xl md:text-5xl font-black neon-title">
                                {movie.Title}
                            </h2>

                            <p className="text-gray-400 mt-3">
                                {movie.Year} • {movie.Type} • {movie.Runtime}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-red-500/20 border border-red-400/50 text-red-200 font-bold hover:bg-red-500/30 hover:shadow-[0_0_18px_rgba(248,113,113,0.35)] transition"
                        >
                            Cerrar
                        </button>
                    </div>

                    <div className="grid md:grid-cols-[360px_1fr] gap-8">
                        <div>
                            <img
                                src={
                                    movie.Poster !== 'N/A'
                                        ? movie.Poster
                                        : 'https://via.placeholder.com/400x600?text=Sin+Imagen'
                                }
                                alt={movie.Title}
                                className="w-full rounded-2xl poster-glow border border-cyan-400/30"
                            />
                        </div>

                        <div>
                            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                                <div className="rounded-2xl bg-slate-950/70 border border-yellow-400/30 p-4">
                                    <p className="text-yellow-300 text-sm font-semibold">IMDb</p>
                                    <p className="text-white text-2xl font-black">
                                        ⭐ {movie.imdbRating}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-950/70 border border-cyan-400/30 p-4">
                                    <p className="text-cyan-300 text-sm font-semibold">Votos</p>
                                    <p className="text-white text-xl font-black">
                                        {movie.imdbVotes}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-950/70 border border-pink-400/30 p-4">
                                    <p className="text-pink-300 text-sm font-semibold">Tipo</p>
                                    <p className="text-white text-xl font-black capitalize">
                                        {movie.Type}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                                {movie.Plot}
                            </p>

                            <div className="grid gap-3 text-gray-300">
                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">Género:</strong> {movie.Genre}
                                </p>

                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">Director:</strong> {movie.Director}
                                </p>

                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">Actores:</strong> {movie.Actors}
                                </p>

                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">Idioma:</strong> {movie.Language}
                                </p>

                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">País:</strong> {movie.Country}
                                </p>

                                <p className="border-b border-cyan-400/10 pb-2">
                                    <strong className="text-cyan-300">Premios:</strong> {movie.Awards}
                                </p>

                                <p>
                                    <strong className="text-cyan-300">Estreno:</strong> {movie.Released}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}