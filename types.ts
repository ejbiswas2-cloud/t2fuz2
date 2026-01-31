
export type ViewType = 
  | 'dashboard' 
  | 'domains' 
  | 'files' 
  | 'databases' 
  | 'software' 
  | 'security' 
  | 'metrics' 
  | 'advanced' 
  | 'settings' 
  | 'cloudflare'
  | 'docs';

export interface ServerStatus {
  uptime: string;
  load: number[];
  cpu: number;
  memory: { used: number; total: number; percent: number };
  disk: { used: number; total: number; percent: number };
}

export type WebsiteStatus = 'active' | 'paused' | 'error' | 'deploying';
export type WebsiteType = 'WordPress' | 'Full-Stack EHR' | 'Node.js' | 'Static' | 'Laravel' | 'Django' | 'Custom';
export type EnvMode = 'Production' | 'Development';
export type CacheProfile = 'Disabled' | 'Standard' | 'Aggressive';

export interface Website {
  id: string;
  domain: string;
  type: WebsiteType;
  status: WebsiteStatus;
  ssl: 'Auto' | 'Disabled' | 'Manual';
  runtime: string;
  root: string;
  port?: number;
  gitRepo?: string;
  databases?: string[]; // Multiple DB support
  dbUser?: string;
  dbPass?: string;
  wwwAlias: boolean;
  isAddon: boolean;
  envMode: EnvMode;
  cacheProfile: CacheProfile;
  autoTunnel: boolean;
}

export interface Domain {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  ssl: boolean;
  runtime: string;
  root: string;
}

export interface Service {
  name: string;
  status: 'running' | 'stopped' | 'error';
  version: string;
}
