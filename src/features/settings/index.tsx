'use client';

import { useState } from 'react';
import { nip19 } from 'nostr-tools';
import { useActiveUser } from 'nostr-hooks';
import { useLocalStorage } from 'usehooks-ts';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hexToBytes } from '@noble/hashes/utils';
import { Switch } from '@/components/ui/switch';

export const Settings = () => {
  // Localstorage
  const [secret] = useLocalStorage('secret-key', '', { initializeWithValue: true });

  const { activeUser } = useActiveUser();

  // Flow
  const [showSecret, setShowSecret] = useState<boolean>(false);

  const npub = nip19.npubEncode(activeUser?.pubkey || '');
  const nsec = nip19.nsecEncode(hexToBytes(secret));

  return (
    <>
      <div className='overflow-x-hidden flex flex-col items-center w-full'>
        <div className='flex flex-col justify-center gap-2 w-full p-4'>
          <Tabs defaultValue='general'>
            <TabsList className='w-full'>
              <TabsTrigger className='flex-1' value='general'>
                General
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='network'>
                Network
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='support'>
                Support
              </TabsTrigger>
            </TabsList>
            <TabsContent value='general'>
              <div className='flex flex-col gap-2 w-full'>
                <Card tabIndex={-1}>
                  <CardHeader>
                    <CardTitle>Public key</CardTitle>
                    <CardDescription>
                      Your public key acts as your digital address. Share it freely so others can find you on the
                      network.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder='npub' value={npub} readOnly />
                  </CardContent>
                </Card>
                {secret && (
                  <Card className='bg-background border-primary'>
                    <CardHeader className='flex flex-row items-start gap-8'>
                      <div className='flex flex-col gap-2'>
                        <CardTitle>Private key</CardTitle>
                        <CardDescription>
                          Keep it safe and never share it. If someone gets it, they will permanently control your
                          account.
                        </CardDescription>
                      </div>
                      <Switch onCheckedChange={() => setShowSecret(!showSecret)} />
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder='npub'
                        value={!showSecret ? '********************************' : nsec}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            <TabsContent value='network'>
              <div className='w-full p-4 bg-warning/10 rounded-lg border-[1px] border-dotted border-warning/35 text-center mt-2'>
                <span className='text-sm text-warning-foreground'>Network under construction.</span>
              </div>
            </TabsContent>
            <TabsContent value='support'>
              <div className='w-full p-4 bg-warning/10 rounded-lg border-[1px] border-dotted border-warning/35 text-center mt-2'>
                <span className='text-sm text-warning-foreground'>Support under construction.</span>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
