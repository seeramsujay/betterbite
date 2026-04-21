import "./globals.css";
import React from 'react';

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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,add_a_photo,analytics,arrows_outward,auto_awesome,auto_stories,bedtime,bolt,book,chevron_right,compare_arrows,dashboard,directions_walk,electric_bolt,favorite,info,mic,notifications,photo_camera,restaurant,search,settings,signal_cellular_alt,wb_sunny&display=swap" rel="stylesheet" />
        {/* Prevent flash of unstyled content to some degree */}
      </head>
      <body className="antialiased font-body bg-background text-on-surface">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
