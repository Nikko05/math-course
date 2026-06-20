import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
import "@/styles/global.css";
=======
import "./globals.css";
>>>>>>> cms
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MJakMatematyka",
  description: "Learning math courses with MJakMatematyka",
  icons: {
    icon: '/logo_basic.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col lg:px-20 xl:px-60`} >
        <NavigationBar/>
        <main className="flex-1 p-5 flex flex-col justify-around items-center">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
