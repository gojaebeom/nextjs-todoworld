/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTheme, useUser } from "src/hooks";
import { ParticleContainer } from ".";

export default function ScaffoldContainer({ children }) {
  const { themeInitialize, getMatchedThemeData } = useTheme();
  const { themeColor } = getMatchedThemeData();
  const { credentialCheck, onFirebaseAuthStateChanged } = useUser();

  /**@테마_초기화 */
  useEffect(() => themeInitialize(), []);

  /**@로그인_상태채크 */
  useEffect(() => {
    const unsub = onFirebaseAuthStateChanged();
    return () => unsub();
  }, []);

  return !credentialCheck ? (
    <div
      className="fixed w-full h-full"
      style={{
        backgroundColor: themeColor,
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
