import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/navbar/page";
import AuthProvider from "./Components/Providers/SessionProvider";

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
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
