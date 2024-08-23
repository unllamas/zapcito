// Packages
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

// Libs and hooks
import { cn } from '@/lib/utils';

// Components
const MainLayout = dynamic(() => import('../components/layouts/main-layout').then((mod) => mod.MainLayout), {
  loading: () => (
    <div className='flex justify-center items-center w-full h-full'>
      <p className='font-bold'>Loading...</p>
    </div>
  ),
  ssr: false,
});

// Style
import '@/index.css';

// Assets
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html className='h-full scroll-smooth' lang='es' suppressHydrationWarning>
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
      <GoogleTagManager gtmId={process.env.TM_KEY || ''} />
      <body className={cn('flex min-w-[100dvw] min-h-[100dvh] overflow-x-hidden antialiased', montserrat.variable)}>
        <div className='w-full min-h-full' id='root'>
          <MainLayout>{children}</MainLayout>
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.GA_KEY || ''} />
    </html>
  );
}
