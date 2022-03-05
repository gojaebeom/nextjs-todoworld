import { useTheme } from "src/hooks";

export default function ThemeButton({
  type,
  children,
  clickEvent,
  className = "my-4",
}) {
  const { getMatchedThemeData } = useTheme();
  const { buttonStyles, textColor } = getMatchedThemeData();

  return (
    <button
      className={`
        w-full px-4 py-2 text-center transition duration-100 ease-in
        focus:ring-offset-white focus:outline-none focus:ring-2 rounded-md
        focus:ring-offset-2 ${buttonStyles} ${className}`}
      onClick={clickEvent}
      style={{ color: textColor }}
      type={type}
    >
      {children}
    </button>
  );
}
/**
 *
 * #328968 초록
 * #047857 강한초록
 * #01DFA5 연한초록
 *
 * #2563EB 파랑
 * #1D4ED8 강한파랑
 * #85C1E9 연한파랑
 *
 * #F87171 분홍
 * #EF4444 강한분홍
 * #F5B7B1 연한분홍
 *
 * #A569BD 보라
 * #9e5db8 강한보라
 * #C39BD3 연한보라
 *
 * #F59E0B 오랜지
 * #E67E22 강한 오랜지
 * #FAD7A0 연한 오랜지
 */
