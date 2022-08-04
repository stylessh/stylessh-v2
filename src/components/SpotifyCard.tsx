import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import getCurrentListening from "api/spotify";


export default function SpotifyCard() {
    const [song, setSong] = useState<any>(null)

    useEffect(() => {
        async function getData() {
            const data = await getCurrentListening();

            console.log(data)

            if (data) {
                const info = {
                    isPlaying: data.is_playing,
                    title: data.item.name,
                    artist: data.item.artists.map((_artist) => _artist.name).join(", "),
                    album: data.item.album.name,
                    albumArt: data.item.album.images[0].url,
                    url: data.item.external_urls.spotify,
                }


                setSong(info)
            }
        }

        getData()
    }, [])


    if (!song) return null

    return (
        <li class="text-green-500 md:relative cursor-pointer spotify">
            <p class="hidden md:block">listening to...</p>
            <p class="md:hidden">sp.</p>

            <article class="card absolute top-full left-0 md:left-auto right-0 w-full md:w-max pt-4 text-white hidden">
                <a href={song.url} rel="noreferrer" target="_blank" class="p-4 bg-[#161616] flex items-center rounded-md">
                    <img src={song.albumArt} alt="Album art" class="h-24 w-24 mr-4" />

                    <div>
                        <h1 class="font-bold mb-2">{song.title}</h1>
                        <p class="text-sm">{song.album} by {song.artist}</p>
                    </div>
                </a>
            </article>
        </li>
    )
}