'use client';

// Packages
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Confetti from 'react-confetti-boom';

// Libs and hooks
import { useZap } from './hooks/use-zap';

// Components
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';

// Mock
import { ZAP_AMOUNTS } from './config';
import { CopyIcon, LightningBoltIcon } from '@radix-ui/react-icons';

export function Zap() {
  // Flow
  const [open, setOpen] = useState(false);

  // Hooks
  const { screen, amount, comment, invoice, processing, copy, reset, pay, generate, setAmount, setComment } = useZap();

  return (
    <>
      <Drawer onClose={reset} open={open && screen !== 'finished'} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button className='flex-1'>
            <LightningBoltIcon />
            <p className='ml-2'>Zap me!</p>
          </Button>
        </DrawerTrigger>
        <DrawerContent className='max-w-[400px] mx-auto'>
          {/* Content */}
          <div className='py-4'>
            {screen === 'information' && (
              <div className='flex flex-col gap-2 px-4'>
                <h3 className='font-bold text-md text-center'>Select a value</h3>
                <div className='grid grid-cols-3 gap-1'>
                  {ZAP_AMOUNTS?.map((zap) => {
                    return (
                      <Button
                        key={zap.id}
                        className='flex-1'
                        size='sm'
                        variant={amount === zap.amount ? 'secondary' : 'outline'}
                        onClick={() => setAmount(zap.amount)}
                      >
                        {zap.label}
                      </Button>
                    );
                  })}
                </div>
                <div className='flex flex-col gap-2'>
                  <Textarea
                    name='message'
                    id='message'
                    placeholder='Mensaje (opcional)'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!amount}
                  />
                </div>
              </div>
            )}
            {screen === 'payment' && (
              <div className='flex flex-col gap-2 px-4'>
                <h3 className='font-bold text-md text-center'>Waiting for payment</h3>
                <p className='text-center text-sm text-bold text-muted-foreground'>{amount} SAT</p>
                <div className='mx-auto p-4 bg-white rounded-lg'>
                  {invoice && (
                    <QRCodeSVG
                      value={invoice?.bolt11.toLowerCase()}
                      onClick={() => copy(invoice?.bolt11.toLowerCase())}
                      className='cursor-pointer'
                      size={300}
                      imageSettings={{
                        // Iso 24x24, image 42x42
                        src: '/favicon.ico',
                        x: undefined,
                        y: undefined,
                        height: 42,
                        width: 42,
                        excavate: true,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='flex flex-col gap-2 px-4 pb-4'>
            {screen === 'information' && (
              <Button
                className='w-full zap_generated'
                disabled={amount === 0}
                variant={amount === 0 ? 'secondary' : 'default'}
                onClick={generate}
              >
                Generate invoice
              </Button>
            )}
            {screen === 'payment' && (
              <div className='flex gap-2'>
                <Button
                  variant='secondary'
                  className='w-full'
                  onClick={() => pay(invoice?.bolt11.toLowerCase())}
                  disabled={processing}
                >
                  Pay con wallet
                </Button>
                <Button className='w-full' onClick={() => copy(invoice?.bolt11.toLowerCase())}>
                  <CopyIcon />
                  <p className='ml-2'>Copy</p>
                </Button>
              </div>
            )}
            <DrawerClose asChild>
              <Button variant='ghost' className='w-full'>
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>

      {screen === 'finished' && <Confetti mode='boom' particleCount={48} />}
    </>
  );
}
