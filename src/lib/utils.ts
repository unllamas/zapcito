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

export function timeAgo(timestamp: any) {
  const now = Math.floor(Date.now() / 1000); // Obtener el tiempo actual en segundos
  const secondsAgo = now - timestamp;

  const minutes = Math.floor(secondsAgo / 60);
  const hours = Math.floor(secondsAgo / 3600);
  const days = Math.floor(secondsAgo / 86400);
  const weeks = Math.floor(secondsAgo / 604800);
  const months = Math.floor(secondsAgo / 2592000);
  const years = Math.floor(secondsAgo / 31536000);

  if (secondsAgo < 60) {
    return `${secondsAgo}s ago'}`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else if (months < 12) {
    return `${months}m ago`;
  } else {
    return `${years}y ago`;
  }
}
