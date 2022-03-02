/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import DefaultAvatar from "src/assets/images/default_avatar.svg";

export default function ImageOrDefault({
  src,
  alt = "image",
  defaultImg = DefaultAvatar,
  className,
  width = 50,
  height = 50,
}) {
  return (
    <Image
      src={src ? src : defaultImg}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
