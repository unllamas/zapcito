'use client';

// Packages
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { useLogin } from 'nostr-hooks';
import { toast } from 'sonner';
import { ArrowLeftIcon, EyeOpenIcon, EyeClosedIcon, ClipboardIcon } from '@radix-ui/react-icons';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function Login() {
  // Flow
  const [inputValue, setInputValue] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // Libs and hooks
  const router = useRouter();

  // const { loginWithExtention } = useLogin();
  const { user, loading, loginWithSecretKey, loginWithExtension, generateKey } = useAuth();

  if (user) {
    router.push('/');
    return null;
  }

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
    } catch (error) {
      toast.info('Oops...');
      return null;
    }
  };

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleGenerate = () => {
    const key = generateKey();
    setInputValue(key);
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center gap-4 max-w-md px-4'>
          <Image src='/img/lock.png' alt='Lock icon by Yassine Design' width={200} height={200} />
          <div className='flex flex-col gap-2 text-center'>
            <h2 className='text-bold text-xl'>Login</h2>
            <p className='text-muted-foreground'>Connect and access all the features we have to offer.</p>
          </div>
          <Tabs defaultValue='extension' className='w-full'>
            <TabsList className='w-full bg-card'>
              <TabsTrigger className='flex-1' value='extension'>
                Extension
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='secret'>
                Secret key
              </TabsTrigger>
            </TabsList>
            <TabsContent className='flex flex-col gap-4' value='extension'>
              <div className='flex flex-col gap-2'>
                <Button className='w-full' onClick={() => loginWithExtension()}>
                  Login with extension
                </Button>
                <Button className='w-full' onClick={() => router.push('/')} variant='ghost'>
                  <ArrowLeftIcon />
                  <p className='ml-2'>Back to home</p>
                </Button>
              </div>
              <div className='flex flex-col text-sm text-center'>
                <p className='text-gray-500'>Not have one installed yet?</p>
                <div className='flex justify-center items-center gap-1 text-sm'>
                  <span>We recommend installing </span>
                  <Button variant='link' size='sm' className='p-0 text-md' asChild>
                    <a href='https://getalby.com/' target='_blank'>
                      Alby
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent className='flex flex-col gap-4' value='secret'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='secret'>Your private key</Label>
                <div className='relative w-full'>
                  <Input
                    className='pr-[82px]'
                    id='secret'
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder='Format hex or nsec...'
                    value={inputValue}
                    readOnly
                  />
                  <div className='absolute top-0 right-[2px] flex items-center h-full'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={handleToggleVisibility}
                      title={isPasswordVisible ? 'Hide' : 'Show'}
                    >
                      {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </Button>
                    <Button variant='ghost' size='sm' onClick={handlePasteInput} title='Paste from clipboard'>
                      <ClipboardIcon />
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Button className='w-full' disabled={loading} onClick={() => loginWithSecretKey(inputValue)}>
                  {loading ? 'Loading' : 'Login'}
                </Button>
                <Button className='w-full' onClick={() => router.push('/')} variant='ghost'>
                  <ArrowLeftIcon />
                  <p className='ml-2'>Back to home</p>
                </Button>
              </div>
              <div className='text-sm text-center'>
                <p className='text-gray-500'>Don&apos;t you have one yet?</p>
                <Button variant='link' onClick={() => handleGenerate()}>
                  Generate a random
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
