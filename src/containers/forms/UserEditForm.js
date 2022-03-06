/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { useImage, useUser } from "src/hooks";

export default function UserEditForm() {
  const { handleFileOnChange, file, fileUrl } = useImage();
  const { user, edit, destroy } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((form) => edit(form, file))}
      className="min-w-[350px] max-w-[350px]"
    >
      <div className="flex flex-col w-full">
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-800">
            프로필 이미지(선택)
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
          ...register("nickname", {
            required: "닉네임은 필수 입력값입니다.",
            minLength: {
              value: 2,
              message: "최소 2글자 이상 입력해주세요.",
            },
            maxLength: {
              value: 4,
              message: "최대 4글자까지 입력이 가능합니다.",
            },
          }),
        }}
        label="이름(닉네임)"
        name="nickname"
        type="text"
        placeholder="이름 입력"
        errors={errors}
        value={user.nickname}
      />
      <div className="mt-2"></div>
      <ThemeInput
        reactHookFormObj={{
          ...register("phoneNumber", {
            pattern: {
              value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
              message: "xxx-xxxx-xxxx 형태로 입력해주세요.",
            },
          }),
        }}
        label="전화번호(선택)"
        name="phoneNumber"
        type="text"
        placeholder="이름 입력"
        errors={errors}
        value={user.phoneNumber}
      />

      <button
        className="my-4 text-xs text-red-500"
        type="button"
        onClick={destroy}
      >
        회원탈퇴
      </button>

      <ThemeButton className="mt-2">정보 변경</ThemeButton>
    </form>
  );
}
