import { useState } from 'react';
import { toast } from 'sonner';

import { useProfile } from '@/hooks/use-profile';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const Search = () => {
  const [searchText, setSearchText] = useState<string>('');

  const { search } = useProfile();

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSearchText(text);
    } catch (error) {
      toast.info('Oops...', {
        description: 'There was an error trying to paste.',
      });
      return null;
    }
  };

  return (
    <div className='relative flex flex-col items-center gap-2 w-full'>
      <div className='flex flex-col lg:flex-row gap-2 w-full'>
        <div className='relative flex-1 h-[60px]'>
          <Input
            type='text'
            placeholder='Search profile'
            className='min-h-[60px] pl-4 pr-[100px]'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <div className='absolute top-0 right-3 flex items-center h-full'>
            <Button variant='ghost' onClick={handlePasteInput}>
              Paste
            </Button>
          </div>
        </div>
        <Button
          className='flex gap-1 w-full lg:w-auto min-w-[60px] h-[50px] lg:h-[60px]'
          onClick={() => search(searchText)}
          disabled={!searchText}
        >
          <MagnifyingGlassIcon className='w-4 h-4 lg:w-6 lg:h-6' />
          <span className='lg:hidden'>Search</span>
        </Button>
      </div>
      {/* {message && <>{message}</>} */}
      <p className='text-center text-sm text-gray-500'>Support for: npub, hex or nip05</p>
    </div>
  );
};
