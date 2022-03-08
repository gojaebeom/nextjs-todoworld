import { ParticleContainer } from "src/containers";
import { useGlobalModal, useLoading, useTheme } from "src/hooks";
import EmojiToast from "./EmojiToast";
import ThemeForm from "./forms/ThemeForm";
import GlobalModal from "./GlobalModal";

export default function ThemeContainer({ children }) {
  const { theme, getMatchedThemeData } = useTheme();
  const { type, textColor } = getMatchedThemeData();
  const { openModal, drawTypeMatchedModal } = useGlobalModal();
  const { isLoading } = useLoading();

  return (
    <div
      className="fixed top-0 left-0 flex w-full h-screen transition-all duration-200 font-pre-l"
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

      {/** @파티클효과 */}
      <EmojiToast />

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
          <ThemeForm />
        </GlobalModal>
      )}
    </div>
  );
}
