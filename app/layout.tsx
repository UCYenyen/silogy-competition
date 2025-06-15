import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google"; // Choose your preferred font
import "./globals.css";

// Configure your custom font
const customFont = Inter({
  variable: "--font-custom",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose weights you need
});

// You can also add a secondary font
const headingFont = Caveat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "TolongYuk!",
  description: "Platform gotong royong digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customFont.variable} ${headingFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
