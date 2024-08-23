// Packages
import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

// Components
import { Button } from '@/components/ui/button';

export function Home() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-6 max-w-[400px] h-full mx-auto'>
        <h1 className='text-3xl font-extrabold'>Next-Nostr-Starter-Kit</h1>

        <div className='flex gap-2'>
          <Button asChild>
            <Link href='https://github.com/unllamas/next-nostr-starter-kit' target='_blank' rel='noreferrer'>
              <GitHubLogoIcon />
              <p className='ml-2'>GitHub</p>
            </Link>
          </Button>
          <Button variant='secondary' asChild>
            <Link href='/login'>Login test</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
