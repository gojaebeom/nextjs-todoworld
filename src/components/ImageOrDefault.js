/* eslint-disable @next/next/no-img-element */
import DefaultAvatar from "src/assets/images/default_avatar.svg";

export default function ImageOrDefault({
  src,
  defaultImg = DefaultAvatar,
  className,
  alt = "image",
}) {
  return (
    <div
      className={`overflow-hidden bg-white flex justify-center items-center ${className}`}
    >
      <img
        src={src ? src : defaultImg}
        alt={alt}
        layout="fill"
        className={className}
      />
    </div>
  );
}
