'use client';

// Packages
import { Montserrat } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { useNostrHooks } from 'nostr-hooks';

// Libs and hooks
import { cn } from '@/lib/utils';
import { ndk } from '@/lib/nostr-utils';

// Components
import { Toaster } from '@/components/ui/sonner';

// Style
import '@/index.css';

// Assets
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  useNostrHooks(ndk);

  return (
    <html className='dark h-full scroll-smooth' lang='es' suppressHydrationWarning>
      <head>
        {/* Links */}
        <link rel='icon' type='image/png' href='/favicon.svg' />
        <link rel='canonical' href='' />

        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='' />
        <meta name='keywords' content='' />

        {/* Opengraph */}
        <meta property='og:type' content='website' />
        <meta property='og:title' content='' />
        <meta property='og:description' content='' />
        <meta property='og:image' content='' />
        <meta property='og:url' content='' />
        <meta property='og:site_name' content='' />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content='' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='' />
        <meta property='og:description' content='' />
        <meta property='og:image' content='' />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='' />
        <meta property='twitter:url' content='' />
        <meta name='twitter:title' content='' />
        <meta name='twitter:description' content='' />
        <meta name='twitter:image' content='' />

        {/* robots */}
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content='index, follow' />

        {/* Manifest */}
        <link rel='manifest' href='/manifest.json' />
      </head>
      <body className={cn('flex min-w-[100dvw] min-h-[100dvh] overflow-x-hidden antialiased', montserrat.variable)}>
        <div className='flex justify-center items-center w-full min-h-full' id='root'>
          {children}
        </div>
        <Toaster />
        {process.env.TM_KEY && <GoogleTagManager gtmId={process.env.TM_KEY || ''} />}
        {process.env.GA_KEY && <GoogleAnalytics gaId={process.env.GA_KEY || ''} />}
      </body>
    </html>
  );
}
