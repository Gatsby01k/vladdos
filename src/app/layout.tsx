import "./globals.css";

export const metadata = {
  title: "VLADDOS — Immersive Portfolio",
  description: "High-impact cyberpunk portfolio website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
