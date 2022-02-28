import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { catchHandler } from "src/util/catchHandler";
import { auth, db } from "src/util/firebase";

const credentialUserState = atom({
  key: "credentialUserState",
  default: null,
});

export default function useUser() {
  const [user, setUser] = useRecoilState(credentialUserState);
  const [credentialCheck, setcredentialCheck] = useState(false);

  /**@로그인상태감지_리스너 */
  const onFirebaseAuthStateChanged = () => {
    /**@리스너종료함수반환 */
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

  /**@파이어스토어_유저저장 */
  const storeUser = async ({ user }) => {
    const userObj = {
      id: user.uid,
      email: user.email,
      nickname: "투두",
      level: 1,
      exp: 0,
      phoneNumber: "",
      profileURL: "",
    };
    await db.collection("users").doc(user.uid).set(userObj);
    setUser(userObj);
  };

  /**@파이어베이스_회원가입 */
  const signUpByFirebase = async (form) => {
    console.debug(form);
    // setLoading(true);
    await auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .catch((error) => {
        console.debug(error);
        catchHandler("회원가입에 실패하였습니다.");
      });
    // setLoading(true);
  };

  return {
    user,
    credentialCheck,
    onFirebaseAuthStateChanged,
    setUser,
    signUpByFirebase,
  };
}
