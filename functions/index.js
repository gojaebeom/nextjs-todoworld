const express = require("express");
const cors = require("cors");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./todoit-firebase-key.json");
const { default: axios } = require("axios");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors({ origin: true }));

app.delete("/delete-user", (req, res) => {
  const uid = req.query.uid;
  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      return res.json({ result: `user deleted success` });
    })
    .catch((error) => {
      console.debug(error);
      return res.json({ result: error.message });
    });
});

app.get("/login/kakao", async (req, res) => {
  console.debug("[카카오 로그인 요청]");
  console.debug(req.query.kakaoCode);
  // 카카오 엑세스 토큰 발급
  const act = await getKakaoActByCode(req.query.kakaoCode);

  // 카카오 유저 정보 조회
  const userInfo = await getkakaoUserInfoByAct(act);

  // 카카오 유저 정보를 기반으로 생성 or 업데이트
  const firebaseToken = await createFirebaseToken(userInfo).then(
    (userRecord) => {
      console.debug(userRecord);
      console.debug(
        `creating a custom firebase token based on uid ${userRecord.uid}`
      );
      return admin
        .auth()
        .createCustomToken(userRecord.uid, { provider: "KAKAO" });
    }
  );

  res.json({ firebaseToken: firebaseToken });
});

const getKakaoActByCode = async (code) => {
  const URL = "https://kauth.kakao.com/oauth/token";
  const params = new URLSearchParams();

  params.append("grant_type", "authorization_code");
  params.append("client_id", process.env.KAKAO_CLIENT_ID);
  params.append("redirect_uri", process.env.KAKAO_REDIRECT_URL);
  params.append("code", code);

  const res = await axios({
    method: "post",
    url: URL,
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    withCredentials: false,
    data: params,
  })
    .then((data) => data.data)
    .catch((err) => {
      console.debug("kakao oauth server error!");
      console.debug(err.response);

      throw new Error("kakao oauth server error!");
    });

  return res.access_token;
};

const getkakaoUserInfoByAct = async (act) => {
  const URL = "https://kapi.kakao.com/v2/user/me";
  const res = await axios({
    method: "post",
    url: URL,
    headers: {
      Authorization: `Bearer ${act}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    withCredentials: false,
  })
    .then((data) => data.data)
    .catch((err) => {
      console.debug("kakao oauth server error!");
      console.debug(err.response);
      throw new Error("kakao oauth server error!");
    });

  return res;
};

const createFirebaseToken = (kakaoUserInfo) => {
  const userId = `kakao:${kakaoUserInfo.id}`;
  if (!userId) throw new Error("not found kakao user id ");
  const email = kakaoUserInfo.kakao_account.email
    ? kakaoUserInfo.kakao_account.email
    : null;

  return getOrCreateUser(userId, email);
};

const getOrCreateUser = (userId, email) => {
  return admin
    .auth()
    .getUser(userId)
    .catch((error) => {
      console.debug(error);
      if (error.code === "auth/user-not-found") {
        const createUser = {
          uid: userId,
          email: email ? email : "",
        };
        return admin.auth().createUser(createUser);
      }
      throw error;
    });
};

exports.users = functions.region("asia-northeast3").https.onRequest(app);
