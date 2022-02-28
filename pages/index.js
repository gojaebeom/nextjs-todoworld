import Link from "next/link";
import { useForm } from "react-hook-form";
import { ThemeButton, ThemeInput } from "src/components";
import { useTheme } from "src/hooks";

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { theme, getMatchedThemeData } = useTheme();
  const { themeColor } = getMatchedThemeData();

  const store = (result) => {
    console.debug(result);
  };

  return (
    <>
      <div className="relative z-10 flex flex-col items-end justify-center w-1/2 h-full p-12 text-white">
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
          onSubmit={handleSubmit(store)}
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

          <ThemeButton>로그인</ThemeButton>

          <div className="text-sm text-gray-600">
            계정이 없나요?&nbsp;
            <Link as="/signup" href="/signup" className="text-base">
              <a style={{ color: themeColor }}>회원가입</a>
            </Link>
            에서 먼저 계정을 생성해주세요. 또는 간편하게 카카오톡으로 로그인할
            수 있어요!
          </div>

          <button
            className={`
            w-full px-4 py-2 text-center transition duration-200 ease-in  
            text-black focus:ring-offset-white focus:outline-none focus:ring-2 mt-2
            focus:ring-offset-2 bg-[#FEE500] hover:bg-[#fecf00] focus:ring-[#FEE500] 
            ${theme.rounded && "rounded-lg"}`}
            onClick={() => {
              console.debug(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID);
              console.debug(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL);
              location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;
            }}
            type="button"
          >
            <i className="mr-2 fa-light fa-comment"></i>
            카카오 로그인
          </button>
        </form>
      </div>
    </>
  );
}
