import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Mail } from "lucide-react";
import Footer from "../components/Footer";
import { TelegramIcon } from "../components/UI/TelegramIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Футбольні Прогнози",
  description: "Платформа для футбольних турнірів",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="uk">
      <body className={`${inter.className} bg-gray-100 text-gray-900 antialiased`}>
        <div className="max-w-md mx-auto min-h-screen bg-zinc-900 relative shadow-xl flex flex-col">

          <Header />

            {children}

          <Footer/>

          <div className="fixed bottom-6 right-6 lg:absolute lg:bottom-6 lg:right-6 flex flex-col gap-3 z-40">
            <a
              href="mailto:denis.shmatkov95@gmail.com" 
              className="bg-gray-800 text-white p-3.5 rounded-full shadow-lg hover:bg-gray-900 transition-colors flex items-center justify-center border border-gray-700"
              title="Надіслати пропозицію"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://t.me/santiago_munez_football" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white p-3.5 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              title="Наш Telegram канал"
            >
              <TelegramIcon/>
            </a>
          </div>
          
        </div>
      </body>
    </html>
  );
}