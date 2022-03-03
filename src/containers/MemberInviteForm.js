import { useForm } from "react-hook-form";
import { ImageOrDefault, ThemeButton, ThemeInput } from "src/components";
import { useTheme, useWorld } from "src/hooks";

export default function MemberInviteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { getMatchedThemeData } = useTheme();
  const { borderStyles, themeColor } = getMatchedThemeData();
  const { inviteUser, setInviteUserByUserId, doInvite } = useWorld();

  const searchForm = (form) => {
    setInviteUserByUserId(form.userId);
  };

  return inviteUser ? (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center ml-4">
        <ImageOrDefault
          src={inviteUser.profileURL}
          width={50}
          height={50}
          className="rounded-md"
        />
        <p className="text-sm">{inviteUser?.nickname}</p>
      </div>
      <div className="mx-5">
        <i className="text-xl fa-light fa-ellipsis"></i>
      </div>
      <button
        onClick={doInvite}
        className={`px-2 py-2 border rounded-md ${borderStyles}`}
        style={{
          color: themeColor,
        }}
      >
        초대하기
      </button>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit((form) => searchForm(form))}
      className="min-w-[350px] max-w-[350px]"
    >
      <ThemeInput
        reactHookFormObj={{
          ...register("userId", {
            required: "유저 ID는 필수 입력값입니다.",
          }),
        }}
        label="UID"
        name="userId"
        type="text"
        placeholder="초대할 회원의 id"
        errors={errors}
      />

      <ThemeButton className="mt-2">검색</ThemeButton>
    </form>
  );
}
