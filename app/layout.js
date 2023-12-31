import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/next-auth/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pinterest Clone App",
  description: "created by kesavan-webdev at github",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
