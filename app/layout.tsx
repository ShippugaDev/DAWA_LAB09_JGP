import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Galería de Películas y Series",
    description: "Aplicación con Next.js, SSR, CSR y API OMDb",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>
                {children}
            </body>
        </html>
    );
}