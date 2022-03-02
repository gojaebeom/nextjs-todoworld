/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withPublic } from "src/hoc";
import { useLoading } from "src/hooks";
import { catchHandler } from "src/util/catchHandler";
import { auth } from "src/util/firebase";

export default withPublic(function KakaoRedirectPage() {
  const { loadingOff, loadingOn } = useLoading();
  const { query } = useRouter();
  console.debug(query);

  useEffect(() => {
    query.code && doFirebaseCustomTokenLogin();
  }, []);

  const doFirebaseCustomTokenLogin = async () => {
    // TODO: 카카오 코드를 통한 파이어베이스 커스텀 토큰 요청
    loadingOn();
    const { data } = await axios({
      method: "GET",
      url: `https://asia-northeast3-todo-world-a0263.cloudfunctions.net/users/login/kakao?kakaoCode=${query.code}`,
    }).catch(() => {
      catchHandler(
        "카카오 로그인에 실패하였습니다. 관리자에게 문의하세요.",
        () => loadingOff()
      );
    });

    // TODO: 커스텀 토큰으로 로그인
    await auth.signInWithCustomToken(data.firebaseToken).catch((error) => {
      catchHandler(
        "파이어베이스 커스텀 토큰 로그인에 실패하였습니다. 관리자에게 문의하세요.",
        () => loadingOff()
      );
    });
    loadingOff();
  };
  return <div></div>;
});
