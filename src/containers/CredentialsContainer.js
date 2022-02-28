/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTheme, useUser } from "src/hooks";
import { ParticleContainer } from ".";

export default function CredentialsContainer({ children }) {
  const { theme, themeInitialize } = useTheme();
  const { credentialCheck, onFirebaseAuthStateChanged } = useUser();

  /**@테마_초기화 */
  useEffect(() => themeInitialize(), []);

  /**@로그인_상태채크 */
  useEffect(() => {
    const unsub = onFirebaseAuthStateChanged();
    return () => unsub();
  }, []);

  let color;
  switch (theme.type) {
    case "BLUE":
      color = "#2563EB";
      break;
    case "GREEN":
      color = "#328968";
      break;
    case "PINK":
      color = "#F87171";
      break;
    case "PURPLE":
      color = "#A569BD";
      break;
    case "ORANGE":
      color = "#F59E0B";
      break;
    default:
      color = "#2563EB";
  }

  return !credentialCheck ? (
    <div
      className="fixed w-full h-full"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
      {/** @파티클효과 */}
      <ParticleContainer />
    </div>
  ) : (
    children
  );
}
