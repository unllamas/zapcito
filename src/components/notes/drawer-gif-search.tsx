'use client';

import React, { useState, useEffect } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { toast } from 'sonner';
import { MagicWandIcon } from '@radix-ui/react-icons';

interface GifSearchDrawerProps {
  onGifSelect: (gifUrl: string) => void;
}

const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY as string);

export function DrawerGifSearch({ onGifSelect }: GifSearchDrawerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [_, setIsLoading] = useState(false);

  const fetchGifs = (offset: number) => {
    setIsLoading(true);
    return searchTerm ? gf.search(searchTerm, { offset, limit: 10 }) : gf.trending({ offset, limit: 10 });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    setIsLoading(true);
    // The Grid component will automatically re-fetch when searchTerm changes
  };

  const handleGifClick = (gif: any, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    onGifSelect(gif.images.original.url);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setSearchTerm('');
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' size='icon'>
          <MagicWandIcon className='h-4 w-4' />
          <span className='sr-only'>Search GIFs</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='w-full max-w-4xl mx-auto'>
          <div className='px-4 space-y-4'>
            <div className='flex items-center space-x-2 mt-4'>
              <Input
                placeholder='Search GIFs'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className='overflow-y-auto h-[400px]'>
              <Grid
                key={searchTerm}
                onGifClick={handleGifClick}
                fetchGifs={fetchGifs}
                width={window.innerWidth > 768 ? 864 : window.innerWidth - 32}
                columns={window.innerWidth > 768 ? 3 : 2}
                gutter={6}
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
