/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { GlobalModal } from "src/containers";
import { withPrivate } from "src/hoc";
import {
  useGlobalModal,
  useImage,
  useTheme,
  useUser,
  useWorld,
} from "src/hooks";

export default withPrivate(function MyPage() {
  const { user, signOutByFirebase } = useUser();
  const { worldList, store, setWorldListByCredentialsUser } = useWorld();
  const { theme } = useTheme();
  const { drawTypeMatchedModal, openModal } = useGlobalModal();
  const { handleFileOnChange, file, fileUrl } = useImage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setWorldListByCredentialsUser();
  }, []);

  return (
    <div className="z-10 flex flex-col items-center justify-center w-full text-white">
      <div className="flex flex-col items-center justify-center mb-10">
        <ImageOrDefault
          src={user?.profileURL}
          alt="image"
          className="w-20 h-20 border-2 border-white rounded-full"
        />
        <p className="text-lg font-noto-r">{user?.nickname}</p>
        <p className="text-xs">{user?.id}</p>
        <button
          className={`flex items-center p-2 mt-2 border 
          ${theme.rounded && "rounded-md"}`}
        >
          프로필 수정
          <i className="ml-2 fa-light fa-pencil"></i>
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-noto-b">참가할 투두월드를 선택하세요.</p>
        <div
          id="world-list"
          className="flex flex-wrap items-center justify-center mt-6 max-w-[400px]"
        >
          {worldList.map((world) => {
            return (
              <Link
                href="/worlds/[id]"
                as={`/worlds/${world.id}`}
                key={world?.id}
              >
                <a className="flex flex-col items-center">
                  <ImageOrDefault
                    src={world?.thumbnailURL}
                    alt="image"
                    className="w-16 h-16 rounded-md"
                  />
                  <p className="text-sm">{world?.name}</p>
                </a>
              </Link>
            );
          })}

          <button
            className="flex flex-col items-center mt-1"
            onClick={() => openModal("WORLD_STORE", "투두월드 만들기")}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-md">
              <i className="text-4xl fa-light fa-grid-2-plus"></i>
            </div>
            <p>투두월드 추가</p>
          </button>
        </div>
      </div>

      <button
        className={`flex items-center p-2 mt-20 border 
        ${theme.rounded && "rounded-md"}`}
        onClick={signOutByFirebase}
      >
        로그아웃
      </button>

      {/** @글로벌모달_테마타입 */}
      {drawTypeMatchedModal(
        "WORLD_STORE",
        <GlobalModal>
          <form
            onSubmit={handleSubmit((form) => store(form, file))}
            className="min-w-[350px] max-w-[350px]"
          >
            <div className="flex flex-col w-full">
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-800">
                  썸네일 등록(선택)
                </label>
                <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/jpg,image/png,image/jpeg,image/gif"
                          onChange={handleFileOnChange}
                        />
                      </label>
                      {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
              {fileUrl && (
                <div className="relative mt-2 overflow-hidden">
                  <img src={fileUrl} alt="profile_img" className="rounded-md" />
                </div>
              )}
            </div>
            <br />
            <ThemeInput
              reactHookFormObj={{
                ...register("name", {
                  required: "투두월드 이름은 필수 입력값입니다.",
                }),
              }}
              label="투두월드 이름"
              name="name"
              type="text"
              placeholder="이름 입력"
              errors={errors}
            />

            <ThemeButton className="mt-2">생성하기</ThemeButton>
          </form>
        </GlobalModal>
      )}
    </div>
  );
});
