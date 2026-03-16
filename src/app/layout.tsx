import type { Metadata } from "next";
import { fontSerif, fontSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hòn Đá Bạc — Khu Di tích Lịch sử",
  description: "Giới thiệu Bảo tàng Công an Nhân dân tại Khu Di tích Lịch sử Hòn Đá Bạc — Kế hoạch Phản gián CM-12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${fontSerif.variable} ${fontSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
