/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { GlobalModal, UserEditForm, WorldStoreForm } from "src/containers";
import { withPrivate } from "src/hoc";
import { useGlobalModal, useUser, useWorld } from "src/hooks";

export default withPrivate(function MyPage() {
  const { user, signOutByFirebase } = useUser();
  const { worldList, setWorldListByCredentialsUser } = useWorld();
  const { drawTypeMatchedModal, openModal } = useGlobalModal();

  useEffect(() => {
    setWorldListByCredentialsUser();
  }, []);

  return (
    <div className="z-10 flex flex-col items-center justify-center w-full text-white">
      <div className="flex flex-col items-center justify-center mb-10">
        <ImageOrDefault
          src={user?.profileURL}
          width={80}
          height={80}
          alt="image"
          className="w-20 h-20 border-2 border-white rounded-full"
        />
        <p className="text-lg font-noto-r">{user?.nickname}</p>
        <p className="text-xs">{user?.id}</p>
        <button
          className="flex items-center p-2 px-4 mt-4 border"
          onClick={() => openModal("USER_EDIT", "회원정보 변경")}
        >
          프로필 수정
          <i className="ml-2 fa-light fa-pencil"></i>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-4 text-3xl font-noto-b">
          참가할 투두월드를 선택하세요.
        </p>
        <div className="flex items-center justify-center">
          {worldList.map((world) => {
            return (
              <Link
                href="/worlds/[id]/home"
                as={`/worlds/${world?.id}/home`}
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
                    <p>{world?.name}</p>
                    {/* <p className="text-xs">맴버 : {world?.members.length}명</p>
                  <p className="text-xs">일정 : {world?.schejules.length}개</p> */}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        <button
          className="flex flex-col items-center mt-1"
          onClick={() => openModal("WORLD_STORE", "투두월드 만들기")}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-md">
            <i className="text-4xl fa-light fa-grid-2-plus"></i>
          </div>
          <p className="text-xs">투두월드 추가</p>
        </button>
      </div>

      <button
        className="flex items-center p-2 px-4 mt-20 border"
        onClick={signOutByFirebase}
      >
        로그아웃
      </button>

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
    </div>
  );
});
