import Image from "next/image";
import happyEmojiImg from "src/assets/images/emoji-cong.png";
import { useEmojiToast } from "src/hooks";

function EmojiToast() {
  const { emojiToast, closeEmojiToast } = useEmojiToast();

  let emoji = happyEmojiImg;
  if (emojiToast.type === "HAPPY") emoji = happyEmojiImg;
  else if (emojiToast.type === "STAR") emoji = starEmojiImg;
  else if (emojiToast.type === "SAD") emoji = sadEmojiImg;
  else if (emojiToast.type === "HEART") emoji = heartEmojiImg;

  return (
    emojiToast.open && (
      <div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full cursor-pointer bg-black/80"
        onClick={() => {
          closeEmojiToast();
        }}
      >
        <div
          className="max-w-[300px] p-4 rounded-[4px] flex flex-col justify-center items-center"
          // onClick={(e) => e.stopPropagation()}
        >
          <Image src={emoji} alt="img" />
          <p className="mt-2 text-xl text-white font-pre-bb">
            {emojiToast.message}
          </p>
        </div>
        <div className="fixed top-0 left-0 w-full pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </div>
    )
  );
}

export default EmojiToast;
