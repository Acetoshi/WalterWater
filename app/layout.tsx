// import type { Metadata } from "next";
import Navbar from "@/components/NavBar/Navbar";
import "./globals.css";
import PositionProvider from "@/contexts/Position/PositionProvider";
import PointsOfInterestProvider from "@/contexts/PointsOfInterest/PointsOfInterestProvider";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PositionProvider>
          <PointsOfInterestProvider>
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
          </PointsOfInterestProvider>
        </PositionProvider>
      </body>
    </html>
  );
}
