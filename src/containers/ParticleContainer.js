import { useEffect } from "react";
import { useTheme } from "src/hooks";
import { catchHandler } from "src/util/catchHandler";

/* eslint-disable react-hooks/exhaustive-deps */
export default function ParticleContainer() {
  const { theme, getMatchedThemeData } = useTheme();
  const { particleColor } = getMatchedThemeData();

  useEffect(() => {
    if (document.getElementById("particles-js")) {
      import("src/lib/particles.min.js")
        .then(() => {
          document.getElementById("particles-js") &&
            particlesPlay(particleColor);
        })
        .catch((error) => {
          catchHandler("파티클 라이브러리를 불러오는데 실패하였습니다.");
        });
    }
  }, [theme]);

  const particlesPlay = (color) => {
    console.debug(theme.type);
    console.debug(color);
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: color },
        shape: {
          type: "circle",
          stroke: { width: 0, color: color },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: {
          value: 0.70550130678083,
          random: true,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 8.017060304327615,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 112.2388442605866,
          color: "#ffffff",
          opacity: 0.4,
          width: 19.882309554732483,
        },
        move: {
          enable: theme.effect,
          speed: 3.206824121731046,
          direction: "top",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 80.17060304327615,
            rotateY: 160.3412060865523,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 0.5 } },
          bubble: {
            distance: 400,
            size: 4,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: false,
    });
  };

  return (
    <div
      id="particles-js"
      className="absolute top-0 left-0 w-full h-screen"
    ></div>
  );
}
