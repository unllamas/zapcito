export interface NDKUserProfile {
  [key: string]: string | number | undefined;
  created_at?: number;
  name?: string;
  displayName?: string;
  image?: string;
  banner?: string;
  bio?: string;
  nip05?: string;
  lud06?: string;
  lud16?: string;
  about?: string;
  zapService?: string;
  website?: string;
  profileEvent?: string;
}
