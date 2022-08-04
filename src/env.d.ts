interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
  readonly SPOTIFY_CLIENT_ID: string;
  readonly SPOTIFY_CLIENT_SECRET: string;
  readonly SPOTIFY_REFRESH_TOKEN: string;
  readonly SPOTIFY_CODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
