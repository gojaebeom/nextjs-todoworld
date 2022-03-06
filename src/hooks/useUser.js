/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { catchHandler } from "src/util/catchHandler";
import { auth, db, storage } from "src/util/firebase";
import { useGlobalModal, useLoading } from ".";
import { v4 } from "uuid";
import axios from "axios";

const credentialUserState = atom({
  key: "credentialUserState",
  default: null,
});

export default function useUser() {
  const [user, setUser] = useRecoilState(credentialUserState);
  const { loadingOn, loadingOff } = useLoading();
  const [credentialCheck, setcredentialCheck] = useState(false);
  const { closeModal } = useGlobalModal();
  const [inviteMessageList, setInviteMessageList] = useState([]);

  // ? 로그인 상태감지 리스터
  const onFirebaseAuthStateChanged = () => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await db.collection("users").doc(user.uid).get();
        console.debug("%cCredential User Data:", "color:red");
        console.debug(userRef.data());

        /**@로그인상태감지_리스너 */
        if (userRef.data() === undefined) {
          storeUser({ user });
        } else {
          setUser({
            id: userRef.id,
            ...userRef.data(),
          });
        }
      } else {
        setUser(null);
      }
      setcredentialCheck(true);
    });
  };

  // ? 초대 감지 리스너
  const setInviteStream = () => {
    return db
      .collection("users")
      .doc(user.id)
      .collection("invites")
      .onSnapshot((snapshot) => {
        const list = [];
        snapshot.docs.forEach((invite) => {
          list.push({
            id: invite.id,
            ...invite.data(),
          });
        });
        setInviteMessageList(list);
      });
  };

  // ? 회원 정보 저장
  const storeUser = async ({ user }) => {
    const userObj = {
      id: user.uid,
      email: user.email,
      nickname: "투두",
      phoneNumber: "",
      profileURL: "",
    };
    await db.collection("users").doc(user.uid).set(userObj);
    setUser(userObj);
  };

  // ? 회원가입
  const signUpByFirebase = async (form) => {
    console.debug(form);
    loadingOn();
    await auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .catch((error) => {
        console.debug(error);
        catchHandler("회원가입에 실패하였습니다.", () => loadingOff());
      });
    loadingOff();
  };

  // ? 로그인
  const signInByFirebase = async (form) => {
    console.debug(form);
    loadingOn();
    await auth
      .signInWithEmailAndPassword(form.email, form.password)
      .catch((error) => {
        console.debug(error);
        catchHandler("로그인에 실패하였습니다.", () => loadingOff());
      });
    loadingOff();
  };

  // ? 회원정보 수정
  const edit = async (form, file) => {
    loadingOn();

    let url = "";
    if (file) {
      console.debug("파일존재");
      const storageRef = storage.ref();
      const randomId = v4();
      const profileRef = storageRef.child(`profile/${randomId}.png`);

      // ! 기존에 유저의 프로필 사진이 있다면 해당 프로필 사진을 삭제하는 로직 필요 (미구현)

      await profileRef.put(file).catch((error) => {
        console.debug(error);
        catchHandler("썸네일 저장에 실패했습니다.", () => loadingOff());
      });

      url = await profileRef.getDownloadURL().catch((error) => {
        console.debug(error);
        catchHandler("다운로드URL을 가져오지 못했습니다.", () => loadingOff());
      });
    }

    // 회원 생성
    await db
      .collection("users")
      .doc(user.id)
      .set({
        ...user,
        profileURL: url,
        nickname: form.nickname,
        phoneNumber: form.phoneNumber,
      });

    setUser({
      ...user,
      profileURL: url,
      nickname: form.nickname,
      phoneNumber: form.phoneNumber,
    });

    loadingOff();
    closeModal();
  };

  // ? 로그아웃
  const signOutByFirebase = async () => {
    auth.signOut();
  };

  // ? 회원탈퇴
  const destroy = async () => {
    const result = window.prompt(
      `탈퇴하려면 회원 ID '${user.id}'를 입력해주세요.`
    );
    if (result !== user.id) return false;

    loadingOn();

    //? db 삭제
    await db.collection("users").doc(user.id).delete();

    //? auth 삭제
    await axios({
      method: "delete",
      url: `https://asia-northeast3-todo-world-a0263.cloudfunctions.net/users/delete-user?uid=${user.id}`,
    }).catch((error) => {
      console.debug(error);
      catchHandler("회원 탈퇴에 실패하였습니다.", () => loadingOff());
    });
    window.alert("그동안 투두월드를 이용해주셔서 감사합니다.");
    auth.signOut();
    loadingOff();
    closeModal();
  };

  return {
    user,
    edit,
    destroy,
    credentialCheck,
    onFirebaseAuthStateChanged,
    setUser,
    signUpByFirebase,
    signInByFirebase,
    signOutByFirebase,
    inviteMessageList,
    setInviteStream,
  };
}
