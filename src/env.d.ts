interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly PUBLIC_SPOTIFY_CLIENT_ID: string;
  readonly PUBLIC_SPOTIFY_CLIENT_SECRET: string;
  readonly PUBLIC_SPOTIFY_REFRESH_TOKEN: string;
  readonly PUBLIC_SPOTIFY_CODE: string;
  readonly PUBLIC_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
