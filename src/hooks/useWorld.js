import { useRouter } from "next/router";
import { atom, useRecoilState } from "recoil";
import { db, storage } from "src/util/firebase";
import { useGlobalModal, useLoading, useUser } from ".";
import { v4 } from "uuid";
import { catchHandler } from "src/util/catchHandler";
import { useState } from "react";
import { useEmojiToast } from "./useToast";

const worldListState = atom({
  key: "worldListState",
  default: [],
});

const worldDetailState = atom({
  key: "worldDetailState",
  default: null,
});

const worldDetailObj = {
  id: null,
  thumbnailURL: "",
  name: "",
  parties: [],
  members: [],
};

const memberListState = atom({
  key: "memberListState",
  default: [],
});

export default function useWorld() {
  const [worldList, setWorldList] = useRecoilState(worldListState);
  const [worldDetail, setWorldDetail] = useRecoilState(worldDetailState);
  const [memberList, setMemberList] = useRecoilState(memberListState);
  const [inviteUser, setInviteUser] = useState(null);
  const { user } = useUser();
  const { loadingOff, loadingOn } = useLoading();
  const { closeModal } = useGlobalModal();
  const Router = useRouter();
  const { openEmojiToast } = useEmojiToast();

  // ? 유효한 월드에 진입했는지 판단
  const isValidWorldByWid = async (wid) => {
    // ? wid key 자체가 없으면 바로 차단
    if (!wid) {
      window.alert("잘못된 접근입니다.");
      return Router.replace("/404");
    }

    const worldRef = await db.collection("worlds").doc(wid).get();
    // ? wid에 해당하는 문서가 없으면 차단
    if (worldRef.data() === undefined) {
      //window.alert("잘못된 접근입니다.");
      return Router.replace("/");
    }

    // ? 해당 월드에 유저가 가입되어있는지 확인
    let result = false;
    worldRef.data().members.forEach((member) => {
      if (member.id === user.id) result = true;
    });
    if (!result) {
      //window.alert("권한이 없는 유저입니다.");
      return Router.replace("/");
    }
  };

  // ? 로그인중인 유저의 월드리스트 추출 및 전역상태 값 할당
  const setWorldListByCredentialsUser = async () => {
    return db.collection("worlds").onSnapshot((snapshot) => {
      let list = [];
      snapshot.docs.forEach((world) => {
        let isMatched = false;
        world.data().members.forEach((member) => {
          if (user.id === member.id) isMatched = true;
        });
        if (isMatched) {
          list.push({
            id: world.id,
            ...world.data(),
          });
        }
      });
      // 전역에 있는 월드리스트를 새로운 배열로 덮어쓰기
      setWorldList(list);
    });
  };

  const setWorldDetailStream = (wid) => {
    return db
      .collection("worlds")
      .doc(wid)
      .onSnapshot((snapshot) => {
        setWorldDetail({
          id: snapshot.id,
          ...snapshot.data(),
        });
        if (snapshot.data()) {
          setJoinMemberList(snapshot.data().members);
        }
      });
  };

  // ? 월드의 유저리스트 저장
  const setJoinMemberList = async (members) => {
    const userRef = await db.collection("users").get();

    const list = [];
    userRef.docs.forEach((user) => {
      members.forEach((member) => {
        if (member.id === user.id) {
          list.push({
            id: user.id,
            nickname: user.data().nickname,
            phoneNumber: user.data().phoneNumber,
            profileURL: user.data().profileURL,
            level: member.level,
            exp: member.exp,
            role: member.role,
          });
        }
      });
    });

    console.debug(list);
    setMemberList(list);
  };

  // ? 로그인중인 유저의 권한 확인
  const getCredentialsUserRole = () => {
    let result;
    memberList.forEach((member) => {
      if (member.id === user.id) result = member.role;
    });
    return result;
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
      groups: [],
      members: [
        // ? 새로운 맴버 추가
        {
          id: user.id,
          role: "ADMIN",
          level: 1,
          exp: 0,
        },
      ],
    });

    setWorldList([
      ...worldList,
      {
        id: worldRef.id,
        thumbnailURL: url,
        name: form.name,
        groups: [],
        members: [
          // ? 새로운 맴버 추가
          {
            id: user.id,
            role: "ADMIN",
            level: 1,
            exp: 0,
          },
        ],
      },
    ]);

    loadingOff();
    closeModal();
  };

  // ? 월드 수정
  const edit = async (form, file) => {
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

    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        thumbnailURL: url ? url : worldDetail.thumbnailURL,
        name: form.name,
      });

    loadingOff();
    closeModal();
  };

  // ? 월드 가입
  const join = async (world, ok = true) => {
    loadingOn();
    // ? ok 가 true일 경우 world 가입
    if (ok) {
      const worldRef = await db.collection("worlds").doc(world.id).get();
      // ? 유저가 초대받을 때 쯤 월드가 없어질 수도 있는 경우의 수
      if (worldRef.data() === undefined) {
        window.alert("초대받으려는 월드가 존재하지 않습니다.");
        return loadingOff();
      }
      const prevMembers = worldRef.data().members;
      console.debug(prevMembers);

      await worldRef.ref.update({
        ...worldRef.data(),
        members: [
          ...prevMembers,
          {
            id: user.id,
            level: 1,
            exp: 0,
            role: "MEMBER",
          },
        ],
      });
    }
    console.debug("월드 초대메시지 삭제 --------------");
    // ? 어떤 경우라도 초대메시지는 삭제
    await db
      .collection("users")
      .doc(user.id)
      .collection("invites")
      .doc(world.id)
      .delete();
    console.debug("월드 초대메시지 삭제 완료 --------------");
    loadingOff();
  };

  // ? 회원을 초대하기 전 유저 찾기
  const setInviteUserByUserId = async (userId) => {
    loadingOn();
    console.debug(userId);
    const userRef = await db.collection("users").doc(userId.trim()).get();
    // ? 존재하지 않는 유저
    if (userRef.data() === undefined) {
      window.alert("회원을 찾을 수 없습니다.");
      return loadingOff();
    }
    // ? 이미 가입되어있는 유저
    let result = true;
    worldDetail.members.forEach((member) => {
      if (userRef.id === member.id) {
        result = false;
      }
    });
    if (!result) {
      window.alert("이미 가입되어있는 유저입니다.");
      return loadingOff();
    }

    console.debug(userRef.data());
    setInviteUser({
      id: userRef.id,
      ...userRef.data(),
    });
    loadingOff();
  };

  // ? 회원 초대
  const doInvite = async () => {
    loadingOn();
    // ? 기존에 보낸 초대가 있는지 먼저 확인
    const inviteRef = await db
      .collection("users")
      .doc(inviteUser.id)
      .collection("invites")
      .doc(worldDetail.id)
      .get();
    if (inviteRef.data() !== undefined) {
      window.alert(
        "이미 초대메시지를 발송했습니다. 상대방이 초대를 수락 또는 거절하면 재발송이 가능합니다."
      );
      loadingOff();
      closeModal();
      return;
    }
    // ? 없으면 초대 진행
    await db
      .collection("users")
      .doc(inviteUser.id)
      .collection("invites")
      .doc(worldDetail.id)
      .set({
        name: worldDetail.name,
        thumbnailURL: worldDetail.thumbnailURL,
      });
    window.alert("초대 메시지가 성공적으로 전달되었습니다!");
    loadingOff();
    closeModal();
  };

  // ? 월드 탈퇴
  const doExit = async (memberId) => {
    loadingOn();
    // 탈퇴하려는 대상이 본인이거나 행하는사람이 관리자일 경우만 가능
    let result = false;
    // 자기 자신일 경우
    if (user.id === memberId) result = true;
    // 본인이 관리자일 경우
    if (getCredentialsUserRole() === "ADMIN") result = true;
    // 본인이 관리자이고 자기 자신을 탈퇴하려는 경우
    if (getCredentialsUserRole() === "ADMIN" && user.id === memberId) {
      loadingOff();
      return window.alert("관리자는 탈퇴 대상이 아닙니다!");
    }
    if (!result) {
      loadingOff();
      return window.alert("탈퇴 권한이 없습니다.");
    }

    const answer = window.prompt(
      "월드를 탈퇴하시는건가요?😭\n호기심에 눌러봤다면 취소버튼을 눌러 작업을 중단할 수 있어요.\n정말 탈퇴가 목적이라면 '탈퇴'를 입력해주세요."
    );
    if (answer !== "탈퇴") return loadingOff();

    const filterList = worldDetail.members.filter(
      (member) => member.id !== memberId
    );
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        members: filterList,
      });
    loadingOff();
  };

  // ? 맴버 권한 변경
  const changeRole = async (memberId, role) => {
    loadingOn();
    let result = false;
    if (getCredentialsUserRole() === "ADMIN") result = true;
    if (getCredentialsUserRole() === "ADMIN" && user.id === memberId) {
      loadingOff();
      return window.alert(
        "관리자는 본인의 권한을 수정할 수 없습니다.\n타인에게 관리자 권한을 부여할 경우 권한은 양도되며\n본인은 일반권한으로 변경됩니다."
      );
    }
    if (!result) {
      loadingOff();
      return window.alert("관리자 권한이 없습니다.");
    }

    const answer = window.confirm(
      "관리자권한을 변경하는것에 동의하나요?\n본인은 일반권한으로 변경됩니다."
    );
    if (!answer) return loadingOff();
    const filterList = worldDetail.members.map((member) => {
      if (member.id === memberId) {
        return {
          ...member,
          role: role,
        };
      } else if (member.id === user.id) {
        return {
          ...member,
          role: "MEMBER",
        };
      } else {
        return member;
      }
    });
    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        members: filterList,
      });
    loadingOff();
  };

  // ? 맴버의 레벨 올리기
  const memberLevelUpdate = async (addExp = 0) => {
    const updateList = worldDetail.members.map((m) => {
      if (m.id === user.id) {
        // 현재 로그인중인 유저의 레벨과 경험치
        const currentLevel = m.level;
        const currentExp = m.exp;

        const limitExp = 100; // 정해진 경험치 최대치
        let updateLevel = currentLevel; // 변경될 레벨
        let sumExp = Number(currentExp) + Number(addExp); // 경험치 합산
        if (sumExp >= limitExp) {
          // 경험치 합산이 100이 넘어가면 레벨 증가
          updateLevel += Math.floor(sumExp / limitExp);
          sumExp = sumExp % limitExp;

          //? 레벨업 효과
          openEmojiToast();
        }
        return {
          ...m,
          level: updateLevel,
          exp: sumExp,
        };
      } else return m;
    });

    await db
      .collection("worlds")
      .doc(worldDetail.id)
      .set({
        ...worldDetail,
        members: updateList,
      });
  };

  // ? 월드삭제
  const destroy = async () => {
    const result = window.prompt(
      "월드를 삭제하려면 [월드삭제]를 입력해주세요."
    );
    if (result !== "월드삭제") return;
    loadingOn();
    await db.collection("worlds").doc(worldDetail.id).delete();
    Router.replace("/");
    loadingOff();
  };

  return {
    worldList,
    worldDetail,
    isValidWorldByWid,
    setWorldListByCredentialsUser,
    setWorldDetailStream,
    store,
    edit,
    join,
    inviteUser,
    doInvite,
    doExit,
    setInviteUserByUserId,
    setJoinMemberList,
    memberList,
    getCredentialsUserRole,
    changeRole,
    memberLevelUpdate,
    destroy,
  };
}
