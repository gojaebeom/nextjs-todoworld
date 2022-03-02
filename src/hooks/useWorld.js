import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import { db, storage } from "src/util/firebase";
import { useGlobalModal, useLoading, useUser } from ".";
import { v4 } from "uuid";
import { catchHandler } from "src/util/catchHandler";

const worldListState = atom({
  key: "worldListState",
  default: [],
});

const worldDetailState = atom({
  key: "worldDetailState",
  default: null,
});

export default function useWorld() {
  const [worldList, setWorldList] = useRecoilState(worldListState);
  const [worldDetail, setWorldDetail] = useRecoilState(worldDetailState);
  const { user } = useUser();
  const Router = useRouter();
  const { loadingOff, loadingOn } = useLoading();
  const { closeModal } = useGlobalModal();

  // ? 유효한 월드에 진입했는지 판단
  const isValidWorldByWid = async (wid) => {
    // wid key 자체가 없으면 바로 차단
    if (!wid) {
      window.alert("잘못된 접근입니다.");
      return Router.replace("/404");
    }

    const worldRef = await db.collection("worlds").doc(wid).get();
    // wid에 해당하는 문서가 없으면 차단
    if (worldRef.data() === undefined) {
      window.alert("잘못된 접근입니다.");
      return Router.replace("/404");
    }

    setWorldDetail({
      id: worldRef.id,
      ...worldRef.data(),
    });
  };

  // ? 로그인중인 유저의 월드리스트 추출 및 전역상태 값 할당
  const setWorldListByCredentialsUser = async () => {
    const worldRef = await db.collection("worlds").get();

    let list = [];
    worldRef.docs.forEach((world) => {
      console.debug(world.data());
      let isMatched = false;
      world.data().members.forEach((member) => {
        console.debug(member);
        if (user.id === member) {
          isMatched = true;
        }
      });
      if (isMatched) {
        list.push({
          id: world.id,
          ...world.data(),
        });
      }
    });
    console.debug(list);

    // 전역에 있는 월드리스트를 새로운 배열로 덮어쓰기
    setWorldList(list);
  };

  // ? 새로운 월드 생성 및 전역상태에 생성한 객체 추가
  const store = async (form, file) => {
    loadingOn();

    let url = "";
    if (file) {
      console.debug("파일존재");
      const storageRef = storage.ref();
      const randomId = v4();
      const thumbnailRef = storageRef.child(`thumbnails/${randomId}.png`);

      await thumbnailRef.put(file).catch((error) => {
        console.debug(error);
        catchHandler("썸네일 저장에 실패했습니다.", () => loadingOff());
      });

      url = await thumbnailRef.getDownloadURL().catch((error) => {
        console.debug(error);
        catchHandler("다운로드URL을 가져오지 못했습니다.", () => loadingOff());
      });
    }

    // 월드 생성
    const worldRef = await db.collection("worlds").add({
      thumbnailURL: url,
      name: form.name,
      teams: [],
      members: [user.id],
      schejules: [],
    });

    setWorldList([
      ...worldList,
      {
        id: worldRef.id,
        thumbnailURL: url,
        name: form.name,
        teams: [],
        members: [user.id],
        schejules: [],
      },
    ]);

    loadingOff();
    closeModal();
  };

  return {
    worldList,
    worldDetail,
    isValidWorldByWid,
    setWorldListByCredentialsUser,
    store,
  };
}
