import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
          <GoogleOAuthProvider 
            clientId="310350965260-91o5nvqlvdtfre1jk2mscnoeijmkgmok.apps.googleusercontent.com"
          >
            {children}
          </GoogleOAuthProvider>
          <Toaster/>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
