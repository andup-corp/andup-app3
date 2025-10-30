import "./globals.css";
export const metadata = {
  title: "andup-app3",
  description: "andup向けIT導入補助金対応ツール（試作）",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
