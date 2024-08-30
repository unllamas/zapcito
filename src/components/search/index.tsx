import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nip19 } from 'nostr-tools';
import { toast } from 'sonner';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { splitHandle } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Libs and hooks
  const router = useRouter();

  // Search profile
  const handleSearch = async () => {
    setLoading(true);
    // Verificar si el formato de la pubkey es válido
    let pubkey: string;
    if (searchText) {
      switch (true) {
        case searchText.includes('@'): {
          const [username, domain] = splitHandle(searchText);
          try {
            const response = await fetch(`https://${domain}/.well-known/nostr.json?name=${username}`);
            if (!response) return null;

            let jsonResponse = await response.json();

            if (!jsonResponse || !jsonResponse.names || !jsonResponse.names[username]) throw new Error('Invalid nip05');

            pubkey = jsonResponse.names[username];
            break;
          } catch (err) {
            setLoading(false);
            toast.info('Ups...', {
              description: (err as Error).message,
            });
            return null;
          }
        }

        case searchText.startsWith('npub'): {
          // Decodificar npub a hex usando nostr-tools
          const decoded = nip19.decode(searchText);
          if (decoded.type === 'npub') {
            pubkey = decoded.data as string;
            break;
          } else {
            setLoading(false);
            setSearchText('');
            toast.info('Ups...', {
              description: 'Formato de clave pública no válido.',
            });
            return null;
          }
        }

        case /^[0-9a-fA-F]{64}$/.test(searchText): {
          pubkey = searchText;
          break;
        }

        default: {
          setLoading(false);
          setSearchText('');
          toast.info('Ups...', {
            description: 'Formato de clave pública no válido.',
          });

          return null;
        }
      }

      // Redirigir con la clave convertida
      router.push(`/p/${pubkey}?ref=search`);
    } else {
      setLoading(false);
      toast.info('Ups...', {
        description: 'No se proporcionó ninguna clave pública.',
      });
      return null;
    }

    setLoading(false);
    return null;
  };

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
            <Button variant='ghost' onClick={handlePasteInput} disabled={loading}>
              Paste
            </Button>
          </div>
        </div>
        <Button
          className='flex gap-1 w-full lg:w-auto min-w-[60px] h-[50px] lg:h-[60px]'
          onClick={handleSearch}
          disabled={!searchText || loading}
        >
          <MagnifyingGlassIcon className='w-4 h-4 lg:w-6 lg:h-6' />
          <span className='lg:hidden'>Search</span>
        </Button>
      </div>
      {/* {message && <>{message}</>} */}
      <p className='text-center text-sm text-muted-foreground'>Support for: npub, hex or nip05</p>
    </div>
  );
};
