import { ParticleContainer } from "src/containers";
import { useGlobalModal, useLoading, useTheme } from "src/hooks";
import GlobalModal from "./GlobalModal";

export default function ThemeContainer({ children }) {
  const {
    theme,
    setThemeType,
    toggleThemeEffect,
    toggleThemeRoomSizeUp,
    toggleThemeRounded,
    getMatchedThemeData,
  } = useTheme();
  const { themeColor } = getMatchedThemeData();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { isLoading } = useLoading();

  return (
    <div
      className="fixed top-0 left-0 z-20 flex w-full h-screen transition-all duration-200 font-noto-r"
      style={{
        backgroundColor: themeColor,
      }}
    >
      {children}
      {/** @THEME_SETTING_MODAL_OPEN_BUTTON  */}
      <button
        className="absolute z-10 text-white left-8 bottom-8 hover:animate-pulse"
        onClick={() => {
          openModal("THEME", "테마 설정", true);
        }}
      >
        <i className="text-4xl fa-light fa-palette"></i>
      </button>
      {/** @파티클효과 */}
      <ParticleContainer />

      {/** @로딩화면 */}
      {isLoading && (
        <div className="fixed z-[100] w-full h-full bg-black/30">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      )}

      {/** @글로벌모달_테마타입 */}
      {drawTypeMatchedModal(
        "THEME",
        <GlobalModal>
          <div className="p-2">
            {/** @테마색상변경 */}
            <p className="text-xs">테마 색상</p>
            <div>
              <button
                className="w-10 h-10 mr-2 bg-blue-500 border-4 border-blue-400 rounded-full cursor-pointer "
                onClick={() => setThemeType("BLUE")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-green-600 border-4 border-green-500 rounded-full cursor-pointer "
                onClick={() => setThemeType("GREEN")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-red-400 border-4 border-red-300 rounded-full cursor-pointer "
                onClick={() => setThemeType("PINK")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#A569BD] border-4 border-purple-400 rounded-full cursor-pointer "
                onClick={() => setThemeType("PURPLE")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-yellow-500 border-4 border-yellow-400 rounded-full cursor-pointer "
                onClick={() => setThemeType("ORANGE")}
              ></button>
            </div>
            {/** @테마배경효과_토글 */}
            <div className="mt-4">
              <p className="text-xs">테마 애니메이션 활성화</p>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="checkbox1"
                  className={`absolute block w-6 h-6 duration-200 ease-in  border-4 rounded-full outline-none appearance-none cursor-pointer focus:outline-none 
                            ${
                              theme.effect
                                ? "right-0 bg-red-400"
                                : "right-4 bg-white"
                            }`}
                  onChange={() => toggleThemeEffect()}
                />
                <label
                  htmlFor="checkbox1"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                ></label>
              </div>
            </div>
            {/** @버튼_입력창_디자인_둥글게 */}
            <div className="mt-4 mb-4">
              <p className="text-xs">부드러운 레이아웃 처리</p>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="checkbox2"
                  className={`absolute block w-6 h-6 duration-200 ease-in  border-4 rounded-full outline-none appearance-none cursor-pointer focus:outline-none 
                            ${
                              theme.rounded
                                ? "right-0 bg-blue-400"
                                : "right-4 bg-white"
                            }`}
                  onChange={() => toggleThemeRounded()}
                />
                <label
                  htmlFor="checkbox2"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                ></label>
              </div>
            </div>
            {/** @월드작업영역확대 */}
            <div className="mt-4 mb-4">
              <p className="text-xs">작업영억 확대(월드 입장 시 확인 가능)</p>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="isPrivate"
                  id="checkbox3"
                  className={`absolute block w-6 h-6 duration-200 ease-in  border-4 rounded-full outline-none appearance-none cursor-pointer focus:outline-none 
                            ${
                              theme.roomSizeUp
                                ? "right-0 bg-purple-400"
                                : "right-4 bg-white"
                            }`}
                  onChange={() => toggleThemeRoomSizeUp()}
                />
                <label
                  htmlFor="checkbox3"
                  className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        </GlobalModal>
      )}
    </div>
  );
}
