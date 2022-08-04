import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import projects from "projects.json";

export interface IProject {
  id: number;
  name: string;
  roles: string[];
  url: string;

  media: string;
}

const photos = projects.map((p) => p.media);

export default function ProjectList() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updateMousePos = (e) => {
    setMousePos({ x: e.x, y: e.y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);

    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);

  return (
    <div class="w-[90%] mx-auto py-8 relative">
      {projects.map((project: IProject, i: number) => (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          key={project.id}
          class="flex justify-between items-center text-white py-16 mix-blend-difference"
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(-1)}
        >
          <div class="flex items-center space-x-8">
            <p>{`0${i + 1} / 0${projects.length}`}</p>
            <p class="font-bold text-2xl">{project.name}</p>
          </div>

          <div class="flex items-center space-x-4">
            {project.roles.map((role: string, i: number) => (
              <p key={i}>{role}.</p>
            ))}
          </div>
        </a>
      ))}

      {/* Floating images on hover */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        {photos.map((photo: string, index: number) => {
          const isActive = index === activeIndex;

          const xPos = isActive ? mousePos.x : 0;
          const yPos = isActive ? mousePos.y : 0;

          return (
            <img
              src={photo}
              alt="Work Image"
              className={`absolute w-[900px] h-[700px] object-contain pointer-events-none ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translateX(${xPos - 1000 / 2}px) translateY(${
                  yPos - 700 / 2
                }px)`,
              }}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
