import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>MedQuiz</title>
        <meta name="description" content="Medical quiz for university-level medical students. Test your knowledge in Anatomy, Physiology, Pharmacology, Biochemistry, Pathology and Microbiology." />

        {/* PWA manifest */}
        <link rel="manifest" href="/MedQuiz/manifest.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#0D9488" />
        <meta name="background-color" content="#0F172A" />
        <meta name="msapplication-TileColor" content="#0D9488" />
        <meta name="msapplication-TileImage" content="/MedQuiz/assets/images/icon.png" />

        {/* iOS/Apple PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MedQuiz" />
        <link rel="apple-touch-icon" href="/MedQuiz/assets/images/icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/MedQuiz/assets/images/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/MedQuiz/assets/images/icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/MedQuiz/assets/images/icon.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/MedQuiz/assets/images/favicon.png" />
        <link rel="shortcut icon" href="/MedQuiz/assets/images/favicon.png" />

        {/* Open Graph */}
        <meta property="og:title" content="MedQuiz" />
        <meta property="og:description" content="Medical quiz for university-level medical students." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/MedQuiz/assets/images/icon.png" />

        {/* Outfit font via CSS — avoids JS font-loader timeout on web */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker
                    .register('/MedQuiz/sw.js', { scope: '/MedQuiz/' })
                    .then(function (reg) {
                      console.log('[MedQuiz] SW registered:', reg.scope);
                    })
                    .catch(function (err) {
                      console.warn('[MedQuiz] SW registration failed:', err);
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
