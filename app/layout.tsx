import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/navbar/page";

export const metadata: Metadata = {
  title: "Travel Trip",
  description: "next js + typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
