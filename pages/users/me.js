/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect } from "react";
import { ImageOrDefault } from "src/components";
import { GlobalModal, UserEditForm, WorldStoreForm } from "src/containers";
import { withPrivate } from "src/hoc";
import { useGlobalModal, useUser, useWorld } from "src/hooks";

export default withPrivate(function MyPage() {
  const { user, signOutByFirebase, inviteMessageList, setInviteStream } =
    useUser();
  const { worldList, setWorldListByCredentialsUser, join } = useWorld();
  const { drawTypeMatchedModal, openModal } = useGlobalModal();

  useEffect(async () => {
    const unsub = await setWorldListByCredentialsUser();
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = setInviteStream();
    return () => unsub();
  }, []);

  return (
    <div className="z-10 flex flex-col items-center justify-center w-full text-white">
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="flex items-center justify-center bg-white border-4 border-white rounded-full">
          <ImageOrDefault
            src={user?.profileURL}
            width={80}
            height={80}
            alt="image"
            className="w-20 h-20 rounded-full"
          />
        </div>

        <p className="text-lg font-noto-r">{user?.nickname}</p>
        <p className="text-xs">{user?.id}</p>
        <div className="flex items-center justify-center mt-4">
          <button
            className="flex items-center p-2 px-4 mx-2 border"
            onClick={() => openModal("USER_EDIT", "회원정보 변경")}
          >
            프로필 수정
            <i className="ml-2 fa-light fa-pencil"></i>
          </button>
          <button
            className="flex items-center p-2 px-4 mx-2 border"
            onClick={signOutByFirebase}
          >
            로그아웃
            <i className="ml-2 fa-light fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-4 text-3xl font-pre-bb">
          참가할 투두월드를 선택하세요.
        </p>
        <div className="flex items-center justify-center">
          {worldList.map((world) => {
            return (
              <Link
                href="/worlds/[id]?room=home"
                as={`/worlds/${world?.id}?room=home`}
                key={world?.id}
              >
                <a className="relative flex flex-col items-center mx-4">
                  <ImageOrDefault
                    src={world?.thumbnailURL}
                    alt="image"
                    width={100}
                    height={100}
                  />
                  <div className="absolute flex flex-col items-center justify-center w-full h-full text-sm transition-all hover:bg-black/50">
                    <p className="pt-1">{world?.name}</p>
                    {/* <p className="text-xs">맴버 : {world?.members.length}명</p>
                  <p className="text-xs">일정 : {world?.schejules.length}개</p> */}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        <button
          className="flex flex-col items-center mt-4"
          onClick={() => openModal("WORLD_STORE", "투두월드 만들기")}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-md">
            <i className="text-4xl fa-light fa-grid-2-plus"></i>
          </div>
          <p className="text-xs">투두월드 추가</p>
        </button>
      </div>

      {/** @글로벌모달_테마타입 */}
      {drawTypeMatchedModal(
        "WORLD_STORE",
        <GlobalModal>
          <WorldStoreForm />
        </GlobalModal>
      )}

      {/** @글로벌모달_유저수정타입 */}
      {drawTypeMatchedModal(
        "USER_EDIT",
        <GlobalModal>
          <UserEditForm />
        </GlobalModal>
      )}

      <div className="absolute top-0 right-0 flex flex-col items-end m-6">
        <div className="flex items-center justify-end">
          {/* {!inviteMessageList.length && (
            <p className="mr-2">아직 아무런 소식이 없네요.</p>
          )} */}
          <i className="text-2xl fa-light fa-bell"></i>
        </div>

        {inviteMessageList.map((invite) => {
          return (
            <div
              key={invite.id}
              className="p-2 mt-4 text-black bg-white rounded-md"
            >
              <div className="flex items-start justify-start">
                <ImageOrDefault
                  width={50}
                  height={50}
                  src={invite.thumbnailURL}
                  alt="thumbnail"
                  className="rounded-md"
                />
                <div className="ml-2 text-sm">
                  <div>[{invite.name}]에서 당신을 초대하였습니다!</div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      className="w-1/2 mr-2 text-blue-600 border border-blue-500 rounded-md"
                      onClick={() => join(invite)}
                    >
                      수락
                    </button>
                    <button
                      className="w-1/2 text-red-600 border border-red-500 rounded-md"
                      onClick={() => join(invite, false)}
                    >
                      거절
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
