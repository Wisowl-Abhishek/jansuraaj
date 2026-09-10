import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "../assets/css/main.scss";
// import { Navbar } from "@/components/Navbar";
import { AuthContextProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";
import { TrackingHandler } from "@/components/TrackingHandler";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  title: "जन सुराज - अपनी सपनों की नौकरी 3 गुना तेज़ पाएं",
  description:
    "जन सुराज AI का उपयोग कर उम्मीदवारों को नौकरियों से जोड़ता है, भर्ती को स्वचालित करता है और स्मार्ट जॉब अलर्ट देता है। नौकरी खोजने वालों के लिए व्यक्तिगत सहायक। भर्तीकर्ताओं के लिए शक्तिशाली।",
  keywords:
    "AI job matching, job recommendation engine, job search automation, smart job alerts, best job portal in india, job portal, find jobs, resume-based job recommendations, personalized job search, AI for recruitment, automated candidate matching, AI hiring tools, smart recruitment software, job portal for recruiters, hire faster with AI, AI shortlisting platform, AI job portal India, AI-based job platform, job application tracking, machine learning jobs platform, AI-driven hiring solution, one-stop job portal, all-in-one recruitment system",
  authors: [{ name: "Jan Suraaj Team" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.jansuraaj.org/",
  },
  openGraph: {
    title: "जन सुराज - अपनी सपनों की नौकरी 3 गुना तेज़ पाएं",
    description:
      "जन सुराज AI का उपयोग कर उम्मीदवारों को नौकरियों से जोड़ता है, भर्ती को स्वचालित करता है और स्मार्ट जॉब अलर्ट देता है। नौकरी खोजने वालों के लिए व्यक्तिगत सहायक। भर्तीकर्ताओं के लिए शक्तिशाली।",
    url: "https://www.jansuraaj.org/",
    type: "website",
    images: [
      "https://service.wisowl.com/storage/v1/object/public/assets/Jansuraaj%20party%20logo.jpeg",
    ],
    siteName: "Jan Suraaj",
  },
  twitter: {
    card: "summary_large_image",
    title: "जन सुराज - अपनी सपनों की नौकरी 3 गुना तेज़ पाएं",
    description:
      "जन सुराज AI का उपयोग कर उम्मीदवारों को नौकरियों से जोड़ता है, भर्ती को स्वचालित करता है और स्मार्ट जॉब अलर्ट देता है। नौकरी खोजने वालों के लिए व्यक्तिगत सहायक। भर्तीकर्ताओं के लिए शक्तिशाली।",
    images: [
      "https://service.wisowl.com/storage/v1/object/public/assets/Jansuraaj%20party%20logo.jpeg",
    ],
    site: "@jansuraaj",
    creator: "@jansuraaj",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    language: "hi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Performance: Preconnect & DNS Prefetch */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Jan Suraaj",
              url: "https://wisowl.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://wisowl.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tr76w9cl22");`,
          }}
        />
      </head>
      <body>
        <TrackingHandler />
        <LanguageProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </LanguageProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XW41BDPDN4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XW41BDPDN4');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '794168013607400');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=794168013607400&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
