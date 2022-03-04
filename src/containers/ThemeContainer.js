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
  const { type, textColor } = getMatchedThemeData();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { isLoading } = useLoading();

  return (
    <div
      className="fixed top-0 left-0 flex w-full h-screen transition-all duration-200 font-apple-r"
      style={{
        backgroundColor: type,
        color: textColor,
      }}
    >
      {children}
      {/** @THEME_SETTING_MODAL_OPEN_BUTTON  */}
      <button
        className="absolute z-30 text-white left-8 bottom-8 hover:animate-pulse"
        onClick={() => {
          openModal("THEME", "테마 설정", true);
        }}
      >
        <i className="text-4xl fa-light fa-palette"></i>
      </button>
      {/** @파티클효과 */}
      {theme.effect && <ParticleContainer />}

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
                className="w-10 h-10 mr-2 bg-[#27aae1] border-4 border-[#85C1E9] rounded-full cursor-pointer "
                onClick={() => setThemeType("#27aae1")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#ef404a] border-4 border-[#ed7279] rounded-full cursor-pointer "
                onClick={() => setThemeType("#ef404a")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#f2728c] border-4 border-[#f09eaf] rounded-full cursor-pointer "
                onClick={() => setThemeType("#f2728c")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#ffd400] border-4 border-[#ffe359] rounded-full cursor-pointer "
                onClick={() => setThemeType("#ffd400")}
              ></button>
              <button
                className="w-10 h-10 mr-2 border-4 bg-[#80b463] border-[#9dbb8c] rounded-full cursor-pointer "
                onClick={() => setThemeType("#80b463")}
              ></button>
            </div>
            <div className="mt-1">
              <button
                className="w-10 h-10 mr-2 bg-[#4eb8b9] border-4 border-[#7ec4c4] rounded-full cursor-pointer "
                onClick={() => setThemeType("#4eb8b9")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#9e7eb9] border-4 border-[#bda3d4] rounded-full cursor-pointer "
                onClick={() => setThemeType("#9e7eb9")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#a7a9ac] border-4 border-[#bdbdbd] rounded-full cursor-pointer "
                onClick={() => setThemeType("#a7a9ac")}
              ></button>
              <button
                className="w-10 h-10 mr-2 border-4 bg-[#f79552] border-[#f0a472] rounded-full cursor-pointer "
                onClick={() => setThemeType("#f79552")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#f7c0c7] border-4 border-[#f7ced3] rounded-full cursor-pointer "
                onClick={() => setThemeType("#f7c0c7")}
              ></button>
            </div>
            <div className="mt-1">
              <button
                className="w-10 h-10 mr-2 bg-[#ffcc4e] border-4 border-[#ffd771] rounded-full cursor-pointer "
                onClick={() => setThemeType("#ffcc4e")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#d5e05b] border-4 border-[#e8f371] rounded-full cursor-pointer "
                onClick={() => setThemeType("#d5e05b")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#81d3eb] border-4 border-[#91e1fa] rounded-full cursor-pointer "
                onClick={() => setThemeType("#81d3eb")}
              ></button>
              <button
                className="w-10 h-10 mr-2 border-4 bg-[#b0dfdb] border-[#beebe7] rounded-full cursor-pointer "
                onClick={() => setThemeType("#b0dfdb")}
              ></button>
              <button
                className="w-10 h-10 mr-2 bg-[#bbb8dc] border-4 border-[#cccaeb] rounded-full cursor-pointer "
                onClick={() => setThemeType("#bbb8dc")}
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
