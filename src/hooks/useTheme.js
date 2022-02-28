/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useRecoilState } from "recoil";

const themeState = atom({
  key: "themeState",
  default: {
    type: "BLUE", // GREEN, PINK, PURPLE, ORANGE
    effect: true,
    rounded: true,
    roomSizeUp: false,
  },
});

export default function useTheme() {
  const [theme, setTheme] = useRecoilState(themeState);

  // 최초 페이지 진입시 localStorage에 저장된 테마 재적용
  const themeInitialize = () => {
    const themeStringObj = window.localStorage.getItem("theme");
    console.debug(themeStringObj);
    if (!themeStringObj) return false;
    const themeObj = JSON.parse(themeStringObj);
    console.debug(themeObj);
    setTheme(themeObj);
  };

  // 테마 타입 변경
  const setThemeType = (type) => {
    setTheme({ ...theme, type });
    window.localStorage.setItem("theme", JSON.stringify({ ...theme, type }));
  };

  // 테마 이펙트 on/off
  const toggleThemeEffect = () => {
    setTheme({ ...theme, effect: !theme.effect });
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, effect: !theme.effect })
    );
  };

  // 테마 테두리 각지게/둥글게
  const toggleThemeRounded = () => {
    setTheme({ ...theme, rounded: !theme.rounded });
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, rounded: !theme.rounded })
    );
  };

  // 테마 월드페이지 룸사이즈 default/up
  const toggleThemeRoomSizeUp = () => {
    setTheme({ ...theme, roomSizeUp: !theme.roomSizeUp });
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, roomSizeUp: !theme.roomSizeUp })
    );
  };

  const getMatchedThemeData = () => {
    let themeColor;
    let particleColor;
    let inputStyles;
    let buttonStyles;
    let borderStyles;
    switch (theme.type) {
      case "BLUE":
        themeColor = "#2563EB";
        particleColor = "#85C1E9";
        borderStyles = "border-[#2563EB]";
        buttonStyles = "bg-[#2563EB] hover:bg-[#1D4ED8] focus:ring-[#2563EB]";
        inputStyles = "focus:ring-[#2563EB]";
        break;
      case "GREEN":
        themeColor = "#328968";
        particleColor = "#01DFA5";
        borderStyles = "border-[#328968]";
        buttonStyles = "bg-[#328968] hover:bg-[#047857] focus:ring-[#328968]";
        inputStyles = "focus:ring-[#328968]";
        break;
      case "PINK":
        themeColor = "#F87171";
        particleColor = "#F5B7B1";
        borderStyles = "border-[#F87171]";
        buttonStyles = "bg-[#F87171] hover:bg-[#EF4444] focus:ring-[#F87171]";
        inputStyles = "focus:ring-[#F87171]";
        break;
      case "PURPLE":
        themeColor = "#A569BD";
        particleColor = "#C39BD3";
        borderStyles = "border-[#A569BD]";
        buttonStyles = "bg-[#A569BD] hover:bg-[#9e5db8] focus:ring-[#A569BD]";
        inputStyles = "focus:ring-[#A569BD]";
        break;
      case "ORANGE":
        themeColor = "#F59E0B";
        particleColor = "#FAD7A0";
        borderStyles = "border-[#F59E0B]";
        buttonStyles = "bg-[#F59E0B] hover:bg-[#E67E22] focus:ring-[#F59E0B]";
        inputStyles = "focus:ring-[#F59E0B]";
        break;
      default:
        themeColor = "#2563EB";
        borderStyles = "border-[#2563EB]";
        buttonStyles = "bg-[#2563EB] hover:bg-[#1D4ED8] focus:ring-[#2563EB]";
        inputStyles = "focus:ring-[#328968]";
    }

    return {
      themeColor,
      particleColor,
      borderStyles,
      inputStyles,
      buttonStyles,
    };
  };

  return {
    theme,
    themeInitialize,
    setThemeType,
    toggleThemeEffect,
    toggleThemeRounded,
    toggleThemeRoomSizeUp,
    getMatchedThemeData,
  };
}
