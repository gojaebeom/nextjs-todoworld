/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { ImageFileInput, ThemeButton, ThemeInput } from "src/components";
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
            프로필사진 등록(사진은 1:1 비율로 등록해야 깨짐현상이 없습니다.)
          </label>
          <ImageFileInput handleFileOnChange={handleFileOnChange} />
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
        placeholder="전화번호 입력"
        errors={errors}
        value={user.phoneNumber}
      />

      <ThemeButton className="mt-2">정보 변경</ThemeButton>
      <button
        className="w-full mt-4 text-xs text-right text-red-500"
        type="button"
        onClick={destroy}
      >
        회원탈퇴
      </button>
    </form>
  );
}
