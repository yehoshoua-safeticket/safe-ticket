import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
});

export const metadata: Metadata = {
  title: "SafeTicket – כרטיסים יד שנייה בביטחון",
  description: "קנו ומכרו כרטיסים יד שנייה עם הגנת נאמנות מלאה. הכסף שלכם מוגן עד שתקבלו את הכרטיסים.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[var(--background)] font-[family-name:var(--font-heebo)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
