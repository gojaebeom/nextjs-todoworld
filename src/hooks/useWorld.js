import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import { db, storage } from "src/util/firebase";
import { useLoading, useUser } from ".";
import { v4 } from "uuid";

const worldListState = atom({
  key: "worldListState",
  default: [],
});

export default function useWorld() {
  const [worldList, setWorldList] = useRecoilState(worldListState);
  const { user } = useUser();
  const Router = useRouter();
  const { loadingOff, loadingOn } = useLoading();

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
  };

  // ? 로그인중인 유저의 월드리스트 추출 및 전역상태 값 할당
  const setWorldListByCredentialsUser = async () => {
    // 월드와유저의 관계 컬렉션중 로그인중인 유저가 속한 월드리스트 추출
    const worldUserRef = await db
      .collection("worldUsers")
      .where("userId", "==", user.id)
      .get();

    // 유저가 속한 월드만 있는 월드유저 컬랙션 순회
    const list = await Promise.all(
      worldUserRef.docs.map(async (worldUser) => {
        const worldRef = await db
          .collection("worlds")
          .doc(worldUser.data().worldId)
          .get();
        return {
          id: worldRef.id,
          ...worldRef.data(),
        };
      })
    );
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
        catchAlert("썸네일 저장에 실패했습니다.", () => loadingOff());
      });

      url = await thumbnailRef.getDownloadURL().catch((error) => {
        console.debug(error);
        catchAlert("다운로드URL을 가져오지 못했습니다.", () => loadingOff());
      });
    }

    // 월드 생성
    const worldRef = await db.collection("worlds").add({
      thumbnailURL: url,
      name: form.name,
    });

    // 월드 맴버 생성
    await db.collection("worldUsers").add({
      userId: user.id,
      worldId: worldRef.id,
      role: "ADMIN",
    });

    // 한번더 데이터 통신을 하지 않기 위해 전역에 있는 월드리스트에
    // 저장한 객체를 직접 추가, 이후 새로고침할 경우엔 자연스럽게 setWorldListByUserId를 통해 리스트 가져오기
    // ! 객체를 하나의 클래스로 일관성 있게 관리하는게 아니기때문에 변경시 여러곳 수정 문제 발생 가능성 있음
    setWorldList([
      ...worldList,
      {
        id: worldRef.id,
        thumbnailURL: url,
        name: form.name,
      },
    ]);

    loadingOff();
  };

  return { worldList, isValidWorldByWid, setWorldListByCredentialsUser, store };
}
