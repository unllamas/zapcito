import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nip19 } from 'nostr-tools';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToHex = (value: string) => {
  if (!value) return null;

  if (value.startsWith('npub')) {
    const { data } = nip19.decode(value);
    return data as string;
  }

  return value;
};

export const extractDomain = (url: string): string => {
  try {
    // Crear un objeto URL
    const parsedUrl = new URL(url);

    // Extraer el hostname (dominio completo)
    const hostname = parsedUrl.hostname;

    // Remover el prefijo 'www.' si está presente
    const domain = hostname.startsWith('www.') ? hostname.slice(4) : hostname;

    return domain;
  } catch (error) {
    return url;
  }
};

export const normalizeUrl = (input: string): string => {
  try {
    let domain: string;

    // Detectar si el input ya es una URL completa
    if (input.startsWith('http://') || input.startsWith('https://')) {
      const parsedUrl = new URL(input);
      domain = parsedUrl.hostname;
    } else {
      domain = input;
    }

    // Eliminar el prefijo 'www.' si está presente
    domain = domain.startsWith('www.') ? domain.slice(4) : domain;

    // Construir la URL completa
    const url = `https://${domain}`;

    return url;
  } catch (error) {
    console.error('Error al procesar el input:', error);
    return input;
  }
};

export function shuffleArray(array: any[], limit?: number) {
  const shuffledArray = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return limit ? shuffledArray.slice(0, limit) : shuffledArray;
}

export const normalizeLNDomain = (domain: string) => {
  try {
    const iURL = new URL(domain);
    return iURL.hostname;
  } catch {
    return '';
  }
};

export const splitHandle = (handle: string): string[] => {
  if (!handle.length) return [];

  const [username, domain] = handle.split('@');
  return [username!, domain!];
};
