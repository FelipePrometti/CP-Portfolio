import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CP Portfolio",
  description: "CP de Front",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
