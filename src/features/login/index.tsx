'use client';

// Packages
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import { useLogin } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';
import { toast } from 'sonner';
import { EyeOpenIcon, EyeClosedIcon, ClipboardIcon, TrashIcon } from '@radix-ui/react-icons';
import { useLocalStorage } from 'usehooks-ts';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Login() {
  // Flow
  const [inputValue, setInputValue] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showInputSecret, setShowInputSecret] = useState<boolean>(false);

  // Libs and hooks
  const router = useRouter();

  // const { loginWithExtention } = useLogin();
  const { user, isLoading, loginWithSecretKey, loginWithExtention, generateSecret } = useAuth();
  const [_, setOnboarding] = useLocalStorage('onboarding', false, { initializeWithValue: false });

  if (user) {
    const npub = nip19.npubEncode(user.id);
    router.push(`/p/${npub}`);
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

  const handleCreateAccount = () => {
    const key = generateSecret();
    if (key) {
      setOnboarding(true);
      loginWithSecretKey(key);
    }
  };

  const handleShowInputSecret = () => {
    setShowInputSecret(!showInputSecret);
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

          <div className='flex flex-col gap-4 w-full'>
            <Button className='w-full' onClick={() => loginWithExtention()}>
              Login with extension
            </Button>

            <div className='flex gap-4 items-center my-2'>
              <Separator className='flex-1' />
              <p className='text-sm text-muted-foreground'>OR</p>
              <Separator className='flex-1' />
            </div>

            {!showInputSecret ? (
              <>
                <Button className='w-full' onClick={handleCreateAccount} variant='outline'>
                  Create account
                </Button>
                <div className='text-sm text-center'>
                  <p className='text-muted-foreground'>Do you already have one?</p>
                  <Button variant='link' onClick={handleShowInputSecret}>
                    Login with private key
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor='secret'>Your private key</Label>
                  <div className='relative w-full'>
                    <Input
                      className='pr-[90px]'
                      id='secret'
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder='Format hex or nsec...'
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className='absolute top-0 right-[10px] flex items-center h-full'>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={handleToggleVisibility}
                        title={isPasswordVisible ? 'Hide' : 'Show'}
                      >
                        {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                      </Button>
                      {inputValue ? (
                        <Button variant='ghost' size='sm' onClick={() => setInputValue('')} title='Delete value'>
                          <TrashIcon />
                        </Button>
                      ) : (
                        <Button variant='ghost' size='sm' onClick={handlePasteInput} title='Paste from clipboard'>
                          <ClipboardIcon />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <Button
                    className='w-full'
                    variant='secondary'
                    disabled={isLoading}
                    onClick={() => loginWithSecretKey(inputValue)}
                  >
                    {isLoading ? 'Loading' : 'Login'}
                  </Button>
                  <Button className='w-full' onClick={handleShowInputSecret} variant='ghost'>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
