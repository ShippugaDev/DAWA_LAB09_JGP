import axios from 'axios'
import SearchMovies from './components/SearchMovies'
import MovieCard from './components/MovieCard'
import { Movie } from './types/movie'

const API_KEY = process.env.OMDB_API_KEY

interface OmdbSearchResponse {
  Search?: Movie[]
  totalResults?: string
  Response: string
  Error?: string
}

async function getPopularMovies(): Promise<Movie[]> {
  try {
    if (!API_KEY) {
      throw new Error('Falta configurar OMDB_API_KEY en .env.local')
    }

    const response = await axios.get<OmdbSearchResponse>(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=marvel`
    )

    return response.data.Search || []
  } catch (err) {
    console.error(err)
    return []
  }
}

export default async function Home() {
  const popularMovies = await getPopularMovies()

  return (
    <main className="min-h-screen neon-bg p-6 md:p-10">
      <section className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card neon-border mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_14px_#22d3ee]"></span>

            <p className="text-cyan-200 font-semibold text-sm tracking-widest uppercase">
              Next.js · SSR · CSR · OMDb API
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-black neon-title mb-5">
            🎬 Sin-E-Spoilers 🎭
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explora películas y series sin spoilers. Esta aplicación demuestra el poder de Next.js combinando renderizado del servidor (SSR) para mostrar las películas populares al cargar la página, y renderizado del cliente (CSR) para una búsqueda interactiva y detalles dinámicos sin recargar. ¡Disfruta navegando por el cine sin arruinar sorpresas!
          </p>
        </header>

        <section className="glass-card neon-border rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-cyan-300 font-semibold uppercase tracking-widest text-sm mb-2">
                Renderizado del servidor
              </p>

              <h2 className="text-3xl md:text-4xl font-black neon-gradient-text">
                Películas populares ⭐⭐⭐⭐⭐
              </h2>

              <p className="text-gray-400 mt-3 max-w-2xl">
                Esta sección usa SSR porque la lista inicial se obtiene desde el
                servidor antes de mostrar la página.
              </p>
            </div>

            <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-200 font-bold shadow-[0_0_18px_rgba(34,211,238,0.25)]">
              SSR Activo
            </div>
          </div>

          {popularMovies.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-slate-950/70 border border-cyan-400/30">
              <p className="text-cyan-200 font-semibold">
                No se pudieron cargar las películas populares.
              </p>

              <p className="text-gray-400 mt-2">
                Verifica que tu variable OMDB_API_KEY esté configurada en
                .env.local.
              </p>
            </div>
          )}
        </section>

        <SearchMovies />

        <section className="mt-10 glass-card neon-border rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <p className="text-pink-300 font-semibold uppercase tracking-widest text-sm mb-2">
              Comparación técnica
            </p>

            <h2 className="text-3xl md:text-4xl font-black neon-gradient-text">
              📊 Justificación de renderizado
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-cyan-400/20">
            <table className="w-full border-collapse">
              <thead className="bg-cyan-500/10 text-cyan-100">
                <tr>
                  <th className="p-4 text-left">Sección</th>
                  <th className="p-4 text-left">Renderizado</th>
                  <th className="p-4 text-left">Justificación</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">
                <tr className="border-t border-cyan-400/10">
                  <td className="p-4 font-semibold text-white">
                    Página principal
                  </td>

                  <td className="p-4 text-cyan-300 font-bold">
                    SSR
                  </td>

                  <td className="p-4">
                    Se utiliza SSR porque la lista de películas populares se
                    carga desde el servidor antes de mostrar la página. Esto
                    permite que el contenido inicial esté disponible desde el
                    primer renderizado.
                  </td>
                </tr>

                <tr className="border-t border-cyan-400/10 bg-white/5">
                  <td className="p-4 font-semibold text-white">
                    Búsqueda
                  </td>

                  <td className="p-4 text-pink-300 font-bold">
                    CSR
                  </td>

                  <td className="p-4">
                    Se utiliza CSR porque el usuario puede escribir en el
                    buscador y obtener resultados dinámicos sin recargar la
                    página.
                  </td>
                </tr>

                <tr className="border-t border-cyan-400/10">
                  <td className="p-4 font-semibold text-white">
                    Detalle de película o serie
                  </td>

                  <td className="p-4 text-pink-300 font-bold">
                    CSR
                  </td>

                  <td className="p-4">
                    Se utiliza CSR porque el detalle se muestra al hacer clic en
                    una película o serie, abriendo un modal interactivo dentro
                    de la misma página.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  )
}