/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useRecoilState } from "recoil";

const themeState = atom({
  key: "themeState",
  default: {
    type: "#27aae1",
    effect: true,
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

  // 테마 월드페이지 룸사이즈 default/up
  const toggleThemeRoomSizeUp = () => {
    setTheme({ ...theme, roomSizeUp: !theme.roomSizeUp });
    window.localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, roomSizeUp: !theme.roomSizeUp })
    );
  };

  const getMatchedThemeData = () => {
    let lightColor;
    let strongColor;
    let textColor = "white";
    let inputStyles;
    let buttonStyles;
    let borderStyles;
    switch (theme.type) {
      // 빨강
      case "#ef404a":
        lightColor = "#ed7279";
        strongColor = "#eb232f";
        borderStyles = "border-[#ef404a]";
        buttonStyles = "bg-[#ef404a] hover:bg-[#eb232f] focus:ring-[#ef404a]";
        inputStyles = "focus:ring-[#ef404a]";
        break;
      // 핑크색
      case "#f2728c":
        lightColor = "#f09eaf";
        strongColor = "#ed4c6d";
        borderStyles = "border-[#f2728c]";
        buttonStyles = "bg-[#f2728c] hover:bg-[#ed4c6d] focus:ring-[#f2728c]";
        inputStyles = "focus:ring-[#f2728c]";
        break;
      // 노랑색
      case "#ffd400":
        lightColor = "#ffe359";
        strongColor = "#ffc800";
        borderStyles = "border-[#ffd400]";
        buttonStyles = "bg-[#ffd400] hover:bg-[#ffc400] focus:ring-[#ffd400]";
        inputStyles = "focus:ring-[#ffd400]";
        // textColor = "#424242";
        break;
      // 초록
      case "#80b463":
        lightColor = "#9dbb8c";
        strongColor = "#75ad55";
        borderStyles = "border-[#80b463]";
        buttonStyles = "bg-[#80b463] hover:bg-[#75ad55] focus:ring-[#80b463]";
        inputStyles = "focus:ring-[#80b463]";
        break;
      // 진한 하늘색
      case "#27aae1":
        lightColor = "#85C1E9";
        strongColor = "#0c95cf";
        borderStyles = "border-[#27aae1]";
        buttonStyles = "bg-[#27aae1] hover:bg-[#0c95cf] focus:ring-[#27aae1]";
        inputStyles = "focus:ring-[#27aae1]";
        break;
      // 캔디콘
      case "#4eb8b9":
        lightColor = "#7ec4c4";
        strongColor = "#02b1b3";
        borderStyles = "border-[#4eb8b9]";
        buttonStyles = "bg-[#4eb8b9] hover:bg-[#02b1b3] focus:ring-[#4eb8b9]";
        inputStyles = "focus:ring-[#4eb8b9]";
        break;
      // 연보라
      case "#9e7eb9":
        lightColor = "#bda3d4";
        strongColor = "#8c61b0";
        borderStyles = "border-[#9e7eb9]";
        buttonStyles = "bg-[#9e7eb9] hover:bg-[#8c61b0] focus:ring-[#9e7eb9]";
        inputStyles = "focus:ring-[#9e7eb9]";
        break;
      // 연회색
      case "#a7a9ac":
        lightColor = "#d4d5d6";
        strongColor = "#a2a2a3";
        borderStyles = "border-[#a7a9ac]";
        buttonStyles = "bg-[#a7a9ac] hover:bg-[#a2a2a3] focus:ring-[#a7a9ac]";
        inputStyles = "focus:ring-[#a7a9ac]";
        break;
      // 당근색
      case "#f79552":
        lightColor = "#f7ac79";
        strongColor = "#f28f4b";
        borderStyles = "border-[#f79552]";
        buttonStyles = "bg-[#f79552] hover:bg-[#f28f4b] focus:ring-[#f79552]";
        inputStyles = "focus:ring-[#f79552]";
        break;
      // 연분홍
      case "#f7c0c7":
        lightColor = "#f7d2d7";
        strongColor = "#f7a1ac";
        borderStyles = "border-[#f7c0c7]";
        buttonStyles = "bg-[#f7c0c7] hover:bg-[#f7a1ac] focus:ring-[#f7c0c7]";
        inputStyles = "focus:ring-[#f7c0c7]";
        break;
      // 연분홍
      case "#ffcc4e":
        lightColor = "#fcd779";
        strongColor = "#fcc949";
        borderStyles = "border-[#ffcc4e]";
        buttonStyles = "bg-[#ffcc4e] hover:bg-[#fcc949] focus:ring-[#ffcc4e]";
        inputStyles = "focus:ring-[#ffcc4e]";
        break;
      // 연두색
      case "#d5e05b":
        lightColor = "#e4ed82";
        strongColor = "#d0db4f";
        borderStyles = "border-[#d5e05b]";
        buttonStyles = "bg-[#d5e05b] hover:bg-[#d0db4f] focus:ring-[#d5e05b]";
        inputStyles = "focus:ring-[#d5e05b]";
        break;
      // 하늘색
      case "#81d3eb":
        lightColor = "#99e2f7";
        strongColor = "#5bc4e3";
        borderStyles = "border-[#81d3eb]";
        buttonStyles = "bg-[#81d3eb] hover:bg-[#5bc4e3] focus:ring-[#81d3eb]";
        inputStyles = "focus:ring-[#81d3eb]";
        break;
      // 연한 캔디콘
      case "#b0dfdb":
        lightColor = "#c0ede9";
        strongColor = "#8cd4ce";
        borderStyles = "border-[#b0dfdb]";
        buttonStyles = "bg-[#b0dfdb] hover:bg-[#8cd4ce] focus:ring-[#b0dfdb]";
        inputStyles = "focus:ring-[#b0dfdb]";
        break;
      // 연한 캔디콘
      case "#bbb8dc":
        lightColor = "#cccaeb";
        strongColor = "#a19dcf";
        borderStyles = "border-[#bbb8dc]";
        buttonStyles = "bg-[#bbb8dc] hover:bg-[#a19dcf] focus:ring-[#bbb8dc]";
        inputStyles = "focus:ring-[#bbb8dc]";
        break;
    }

    return {
      type: theme.type,
      lightColor,
      strongColor,
      borderStyles,
      inputStyles,
      buttonStyles,
      textColor,
    };
  };

  return {
    theme,
    themeInitialize,
    setThemeType,
    toggleThemeEffect,
    toggleThemeRoomSizeUp,
    getMatchedThemeData,
  };
}
