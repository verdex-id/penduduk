import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Data Penduduk",
  description: "Data Penduduk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-sans bg-gradient-to-tr from-primary to-primary/30`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
