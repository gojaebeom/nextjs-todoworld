/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { ImageFileInput, ThemeButton, ThemeInput } from "src/components";
import { useImage, useWorld } from "src/hooks";
// import ReactCrop from "react-image-crop";

export default function WorldStoreForm() {
  const { handleFileOnChange, file, fileUrl } = useImage();
  const { store } = useWorld();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  return (
    <form
      onSubmit={handleSubmit((form) => store(form, file))}
      className="min-w-[350px] max-w-[350px]"
    >
      <div className="flex flex-col w-full">
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-800">
            썸네일 등록(사진은 1:1 비율로 등록해야 깨짐현상이 없습니다.)
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
  );
}
