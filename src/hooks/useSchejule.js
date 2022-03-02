import { atom } from "recoil";
import { db } from "src/util/firebase";
import { useLoading, useWorld } from ".";

const schedulesState = atom({
  key: "schedulesState",
  default: [],
});

const scheduleObj = {
  content: "",
  team: null,
  start: new Date(),
  end: new Date(),
};

export default function useSchejule() {
  const { worldDetail } = useWorld();
  const { loadingOff, loadingOn } = useLoading();

  // ? 스캐출 생성
  const store = async (form, dates) => {
    loadingOn();
    console.debug(dates);
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .collection("schejules")
      .add({
        ...scheduleObj,
        content: form.content,
        team: null,
      });
    loadingOff();
  };

  return { store };
}
