import { atom, useRecoilState } from "recoil";

const loadingState = atom({
  key: "loadingState",
  default: false,
});

export default function useLoading() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const loadingOn = () => setIsLoading(true);

  const loadingOff = () => setIsLoading(false);

  return {
    isLoading,
    loadingOn,
    loadingOff,
  };
}
