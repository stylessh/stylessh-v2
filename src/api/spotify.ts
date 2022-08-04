const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const basic = btoa(
  `${import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID}:${
    import.meta.env.PUBLIC_SPOTIFY_CLIENT_SECRET
  }`
);

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: import.meta.env.PUBLIC_SPOTIFY_REFRESH_TOKEN,
    }).toString(),
  });

  return response.json();
};

export default async () => {
  const { access_token } = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status !== 200) {
    return null;
  }

  return await res.json();
};
