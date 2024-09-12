import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { nip19 } from 'nostr-tools';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToHex = (value: string | undefined) => {
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

export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp * 1000) / 1000);

  const minutes = Math.floor(secondsAgo / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (secondsAgo < 60) {
    return 'now';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();

    if (year === currentYear) {
      return `${day} ${month}`;
    } else {
      return `${day} ${month} ${year}`;
    }
  }
}
