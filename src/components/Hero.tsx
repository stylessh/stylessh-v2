import h from "preact";
import { useState, useRef, useLayoutEffect, useEffect } from "preact/hooks";
import { gsap } from "gsap";

const song = {
  webdev: "heytheremylove - bloom.",
  guitarist: "Do I wanna know? - Arctic Monkeys.",
};

const Hero = () => {
  // selected showcase
  const [selected, setSelected] = useState<null | string>(null);
  const [muted, setMuted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(heroRef);

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.fromTo(
      q("h1"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const playAudioShowcase = (showcase: string) => {
    // if different showcase is selected, stop audio
    if (selected !== showcase) {
      audioRef.current.pause();

      audioRef.current.src = `./assets/${showcase}.mp3`;
      audioRef.current.play();
    }
  };

  const handleEnterShowcase = (showcase: string) => {
    setSelected(showcase);
    playAudioShowcase(showcase);
  };

  const handleMuteAudio = () => {
    if (muted) {
      audioRef.current.volume = 1;
      setMuted(false);
    } else {
      audioRef.current.volume = 0;
      setMuted(true);
    }
  };

  return (
    <section
      class="h-screen flex items-end w-[90%] mx-auto py-32 md:py-16 relative"
      ref={heroRef}
      data-scroll
      data-scroll-speed="1.2"
    >
      <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold !leading-tight">
        Hey There! I'm Alan Daniel. <br /> Creative{" "}
        <span
          class={`text-blue-500 transition-opacity cursor-pointer ${
            selected === "webdev" ? "opacity-100" : "opacity-30"
          } hover:opacity-50`}
          onTouchStart={() => handleEnterShowcase("webdev")}
          onClick={() => handleEnterShowcase("webdev")}
        >
          Web Developer
        </span>
        <br /> and{" "}
        <span
          class={`text-amber-500 transition-opacity cursor-pointer ${
            selected === "guitarist" ? "opacity-100" : "opacity-30"
          } hover:opacity-50`}
          onTouchStart={() => handleEnterShowcase("guitarist")}
          onClick={() => handleEnterShowcase("guitarist")}
        >
          Guitarist
        </span>
        .
      </h1>

      <div class="absolute top-20 md:top-5 md:right-0 w-full h-[420px] md:w-[300px] md:h-[450px] -z-10">
        {selected && (
          <img
            ref={(el) =>
              el
                ? gsap.fromTo(
                    el,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5 }
                  )
                : null
            }
            src={`/assets/${selected}.gif`}
            alt="Guitarist showcase"
            class="w-full h-full object-cover grayscale shadow-md"
          />
        )}
      </div>

      {/* song selection */}
      {selected || audioRef.current?.paused === false ? (
        <div class="fixed bottom-0 right-5 md:right-[70px] mb-4 md:mb-16 text-right z-50">
          <p class="text-white text-sm">
            Playing: <span class="">{song[selected]}</span>
          </p>

          <button class="text-gray-500" onClick={handleMuteAudio}>
            {muted ? <p class="text-red-500">muted.</p> : <p>mute.</p>}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
