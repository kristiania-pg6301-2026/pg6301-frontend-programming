import { useRef } from "react";

function SvgPerson({ translate }: { translate: string }) {
  return (
    <g style={{ translate }}>
      <path
        style={{ translate: "19px 0", scale: 2 }}
        d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"
      ></path>
    </g>
  );
}

function SvgOldClient({
  translate,
  text = "Hello",
}: {
  translate: string;
  text?: string;
}) {
  return (
    <g className="old-client" style={{ translate }}>
      <rect x="0" y="0" width={100} height={50} />
      <text x="50" y="30">
        {text}
      </text>
    </g>
  );
}

function SvgArrow({ translate }: { translate: string }) {
  return (
    <path
      style={{ translate }}
      marker-end="url(#head)"
      stroke-width="4"
      fill="none"
      stroke="black"
      d="M50,0 50,30"
    />
  );
}

function SvgMessage({
  ref,
  text,
}: {
  ref: React.RefObject<SVGGElement | null>;
  text: string;
}) {
  return (
    <g className="message" ref={ref}>
      <rect x="140" y="100" width={60} height={25} />
      <text x="170" y="120" style={{ textAnchor: "middle" }}>
        {text}
      </text>
    </g>
  );
}

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
      <SvgPerson translate={"100px 20px"} />
      <SvgOldClient translate={"100px 120px"} />
      <SvgArrow translate={"100px 80px"} />

      <SvgMessage ref={messageRef} text={"Hello"} />

      <SvgPerson translate={"300px 20px"} />
      <SvgOldClient translate={"300px 120px"} />
      <SvgArrow translate={"300px 80px"} />

      <SvgPerson translate={"500px 20px"} />
      <SvgOldClient translate={"500px 120px"} text={"Hello 2"} />
      <SvgArrow translate={"500px 80px"} />

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
