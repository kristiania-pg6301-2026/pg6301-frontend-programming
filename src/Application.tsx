import { useRef } from "react";

export default function Application() {
  const messageRef = useRef<SVGGElement | null>(null);

  const animations = [() => messageRef.current!.classList.add("animate")];

  function handleClick() {
    if (animations.length) {
      animations.pop()!();
    }
  }

  return (
    <svg
      onClick={handleClick}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="old-client">
        <rect x="100" y="120" />
        <text x="150" y="150">
          Hello
        </text>
      </g>
      <path
        marker-end="url(#head)"
        stroke-width="4"
        fill="none"
        stroke="black"
        d="M150,80 150,110"
      />
      <g className="message" ref={messageRef}>
        <rect x="140" y="100"></rect>
        <text x="170" y="120">
          Hello
        </text>
      </g>
      <g className="old-client">
        <rect x="300" y="120" />
        <text x="350" y="150">
          Hello
        </text>
      </g>
      <path
        marker-end="url(#head)"
        stroke-width="4"
        fill="none"
        stroke="black"
        d="M350,80 350,110"
      />
      <g className="old-client">
        <rect x="500" y="120" />
        <text x="550" y="150">
          Hello 2
        </text>
      </g>

      <g style={{ translate: "119px 20px", scale: 2 }}>
        <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
      </g>

      <g style={{ translate: "319px 20px", scale: 2 }}>
        <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
      </g>

      <defs>
        <marker
          id="head"
          orient="auto"
          markerWidth="3"
          markerHeight="4"
          refX="0.1"
          refY="2"
        >
          <path d="M0,0 V4 L2,2 Z" fill="black" />
        </marker>
      </defs>
    </svg>
  );
}
