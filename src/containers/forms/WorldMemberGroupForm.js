import { useForm } from "react-hook-form";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { useTheme, useWorld } from "src/hooks";

export default function MemberGroupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { getMatchedThemeData } = useTheme();
  const { borderStyles, themeColor } = getMatchedThemeData();

  return (
    <form
      onSubmit={handleSubmit((form) => searchForm(form))}
      className="min-w-[350px] max-w-[350px]"
    >
      <ThemeInput
        reactHookFormObj={{
          ...register("name", {
            required: "그룹 이름은 필수 입력값입니다.",
          }),
        }}
        label="name"
        name="name"
        type="text"
        placeholder="그룹 이름 입력"
        errors={errors}
      />

      <ThemeButton className="mt-2">생성</ThemeButton>
    </form>
  );
}
