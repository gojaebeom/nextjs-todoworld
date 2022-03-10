/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export default function ImageOrDefault({
  src,
  alt = "image",
  className,
  width,
  height,
}) {
  const [sizeUp, setSizeUp] = useState(false);

  return (
    <button
      onClick={() => setSizeUp(true)}
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: width, height: height }}
    >
      <img
        src={src ? src : "/default_avatar.svg"}
        alt={alt}
        className="w-full h-full"
      />
    </button>
  );
}
