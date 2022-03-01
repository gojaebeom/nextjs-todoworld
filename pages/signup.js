import Link from "next/link";
import { useForm } from "react-hook-form";
import { ThemeButton, ThemeInput } from "src/components";
import { withPublic } from "src/hoc";
import { useTheme, useUser } from "src/hooks";

export default withPublic(function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpByFirebase } = useUser();
  const { getMatchedThemeData } = useTheme();
  const { themeColor } = getMatchedThemeData();

  return (
    <>
      <div className="z-10 flex flex-col items-end justify-center w-1/2 h-full p-12 text-white">
        <div className="flex items-center mb-4 text-4xl font-noto-b">
          TODO WORLD
          <i className="ml-2 fa-light fa-earth-asia"></i>
        </div>
        <div className="mb-20 text-lg text-right">
          손쉽게 투두월드에 가입하고 팀원들과 일정을 관리 하세요.
          <br />
          투두월드는 일정관리 외에도 팀원들과의 일상, 추억등을 공유하는
          <br />
          타임라인, 메신저 등 소통컨텐츠를 제공합니다.
        </div>
      </div>
      <div className="z-10 flex flex-col items-start justify-center w-1/2 h-full p-12 bg-white">
        <form
          onSubmit={handleSubmit(signUpByFirebase)}
          className="min-w-[350px] max-w-[350px]"
        >
          <ThemeInput
            reactHookFormObj={{
              ...register("email", {
                required: "이메일은 필수 입력값입니다.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "이메일형식이 아닙니다.",
                },
              }),
            }}
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일 입력"
            errors={errors}
          />

          <ThemeInput
            reactHookFormObj={{
              ...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
              }),
            }}
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호 입력"
            errors={errors}
          />

          <ThemeButton>회원가입</ThemeButton>

          <div className="text-sm text-gray-600">
            이미 계정이 있나요?&nbsp;
            <Link href="/" className="text-base">
              <a style={{ color: themeColor }}>로그인</a>
            </Link>
            에서 바로 로그인하세요!
          </div>
        </form>
      </div>
    </>
  );
});
