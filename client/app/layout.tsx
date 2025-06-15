import type { Metadata } from "next";
// import { GeistSans, GeistMono } from "next/font/geist";
import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Toaster } from "react-hot-toast";

// const geistSans = GeistSans({
//   subsets: ["latin"],
//   variable: "--font-geist-sans",
// });

// const geistMono = GeistMono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
// });

export const metadata: Metadata = {
  title: "WEBCASTLE TASK",
  description: "Product Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
         <Toaster position="top-center" />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
