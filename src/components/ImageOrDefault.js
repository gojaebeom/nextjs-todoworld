/* eslint-disable @next/next/no-img-element */

export default function ImageOrDefault({
  src,
  alt = "image",
  className,
  width,
  height,
}) {
  return (
    <div
      className={"flex items-center justify-center overflow-hidden ".concat(className)}
      style={{ width: width, height: height }}
    >
      <img
        src={src ? src : "/default_avatar.svg"}
        alt={alt}
        className="w-full h-full"
      />
    </div>
  );
}
