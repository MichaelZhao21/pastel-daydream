import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pastel Daydream Party!",
    description:
        "I'm throwing a pastel daydream-themed party! Please RSVP here and read through the details :D",
    icons: ["/favicon.ico"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased h-full w-full">{children}</body>
        </html>
    );
}
