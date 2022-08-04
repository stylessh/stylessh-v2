import getCurrentListening from "api/spotify";

export async function get() {
  const response = await getCurrentListening();

  if (response.status === 204 || response.status > 400) {
    return new Response(null, {
      status: 400,
      statusText: "Error in request",
    });
  }

  const song = await response.json();

  console.log(song);

  const info = {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((_artist) => _artist.name).join(", "),
    album: song.item.album.name,
    image: song.item.album.images[0].url,
    url: song.item.external_urls.spotify,
  };

  return new Response(JSON.stringify({ song: info }), {
    status: 200,
  });
}
