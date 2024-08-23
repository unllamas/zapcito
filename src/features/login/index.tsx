'use client';

// Packages
import { useRouter } from 'next/navigation';
import { useActiveUser, useLogin } from 'nostr-hooks';

// Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Login() {
  const router = useRouter();

  // Validate if have active session
  const { activeUser } = useActiveUser();
  const { loginWithExtention } = useLogin();

  if (activeUser) {
    router.push('/');
    return null;
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen w-full bg-background'>
        <div className='container mx-auto flex max-w-md flex-col items-center gap-4 px-4'>
          <div className='flex flex-col gap-2 text-center'>
            <h2 className='text-semibold text-lg'>Login</h2>
            <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Tabs defaultValue='extension' className='w-full'>
            <TabsList className='w-full bg-card'>
              <TabsTrigger className='flex-1' value='extension'>
                Extension
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='secret' disabled>
                Secret key
              </TabsTrigger>
            </TabsList>
            <TabsContent className='flex flex-col gap-4' value='extension'>
              <div className='flex flex-col gap-2'>
                <Button className='w-full' onClick={() => loginWithExtention()} disabled={false}>
                  Login with extension
                </Button>
                <Button className='w-full' onClick={() => router.push('/')} variant='ghost'>
                  Back to home
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
            {/* <TabsContent className="flex flex-col gap-4" value="secret">
            <div className="flex flex-col gap-2">
              <Label htmlFor="secret">Tu clave secreta</Label>
              <div className="relative w-full">
                <Input
                  className="pr-[70px]"
                  id="secret"
                  type="password"
                  placeholder="Formato hex o nsec..."
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
                <div className="absolute top-0 right-[2px] flex items-center h-full">
                  <Button variant="ghost" size="sm" onClick={handlePasteInput}>
                    Pegar
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                className="w-full"
                disabled={!secret}
                onClick={() => loginWithSecretKey({ secretKey: secret })}
              >
                Ingresar
              </Button>
              <Button className="w-full" onClick={() => navigate('/')} variant="ghost">
                Volver al inicio
              </Button>
            </div>
            <div className="text-sm text-center">
              <p className="text-gray-500">¿Aún no tenés?</p>
              <Button variant="link" size="sm" asChild>
                <a href="">Generar una aleatoria</a>
              </Button>
            </div>
          </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </>
  );
}
