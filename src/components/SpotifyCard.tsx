import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import getCurrentListening from "api/spotify";

export default function SpotifyCard() {
  const [song, setSong] = useState<any>(null);
  const [preview, setPreview] = useState<null | HTMLAudioElement>(null);
  const [previewCurrentTime, setPreviewCurrentTime] = useState(0);

  useEffect(() => {
    async function getData() {
      const data = await getCurrentListening();

      if (data) {
        const info = {
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists
            .map((_artist: any) => _artist.name)
            .join(", "),
          album: data.item.album.name,
          albumArt: data.item.album.images[0].url,
          url: data.item.external_urls.spotify,
        };

        setSong(info);

        if (data.item.preview_url) {
          setPreview(new Audio(data.item.preview_url));
        }
      }
    }

    getData();
  }, []);

  const handlePlayPreview = (e) => {
    e.stopPropagation();

    if (preview) {
      preview.play();

      preview.addEventListener("timeupdate", () => {
        // set percentage of preview played
        setPreviewCurrentTime((preview.currentTime / preview.duration) * 100);
      });

      preview.addEventListener("ended", () => {
        preview.currentTime = 0;
        setPreviewCurrentTime(0);
      });
    }

    console.log("play");
  };

  if (!song) return null;

  return (
    <div class="text-[#1DB954] md:relative spotify">
      <p class="hidden md:block">listening to...</p>
      <p class="md:hidden">sp.</p>

      <article class="card absolute top-full left-0 md:left-auto right-0 w-full md:w-[450px] pt-4 text-white hidden">
        <a
          href={song.url}
          rel="noreferrer"
          target="_blank"
          class="p-4 bg-[#161616] flex rounded-md"
        >
          <img
            src={song.albumArt}
            alt="Album art"
            class="h-24 w-24 mr-4 rounded-md"
          />

          <div class="py-2">
            <h3 class="font-bold mb-2">{song.title}</h3>
            <p class="text-sm">
              {song.album} by {song.artist}
            </p>
          </div>
        </a>

        {/* audio player */}
        {preview && (
          <div class="flex items-center gap-5 p-4 bg-[#161616] mt-2 rounded-md">
            <button onClick={handlePlayPreview}>&#9658;</button>

            {/* progress bar */}
            <div class="w-full bg-[#ccc] h-1">
              <div
                class="bg-white h-1"
                style={{
                  width: `${previewCurrentTime}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
