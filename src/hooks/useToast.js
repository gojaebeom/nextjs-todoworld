import { atom, useRecoilState, useResetRecoilState } from "recoil";

export const toastState = atom({
  key: "toastState",
  default: {
    open: false,
    second: 2000,
    type: "SUCCESS",
    message: "",
  },
});

export const emojiToastState = atom({
  key: "emojiToastState",
  default: {
    open: false,
    type: "HAPPY",
    message: "LEVEL UP!! 축하해용~~",
  },
});

export default function useToast() {
  const [toast, setToast] = useRecoilState(toastState);
  const resetToast = useResetRecoilState(toastState);

  return { toast, setToast, resetToast };
}

export function useEmojiToast() {
  const [emojiToast, setEmojiToast] = useRecoilState(emojiToastState);
  const closeEmojiToast = useResetRecoilState(emojiToastState);

  const openEmojiToast = (
    type = "HAPPY",
    message = "LEVEL UP!! 축하해용~~"
  ) => {
    setEmojiToast({ ...emojiToast, open: true, message, type });
  };

  return { emojiToast, openEmojiToast, closeEmojiToast };
}
