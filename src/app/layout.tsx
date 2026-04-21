import "./globals.css";
import React from "react";
import TrpcProvider from "./providers/TrpcProvider";
import ModalShell from "./providers/ModalShell";

export const metadata = {
  title: "BetterBite",
  description: "Precision Metabolic Engine",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0b6947",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,add_a_photo,analytics,arrows_outward,auto_awesome,auto_stories,bedtime,bolt,book,chevron_right,close,compare_arrows,dashboard,directions_walk,electric_bolt,favorite,history,info,mic,notifications,photo_camera,restaurant,search,settings,share,signal_cellular_alt,wb_sunny,cloud_upload&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body bg-background text-on-surface">
        {/* TrpcProvider must wrap everything that uses trpc hooks */}
        <TrpcProvider>
          {children}
          {/* ModalShell is client-only via dynamic import ssr:false */}
          <ModalShell />
        </TrpcProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
