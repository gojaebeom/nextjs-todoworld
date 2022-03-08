/* eslint-disable react-hooks/exhaustive-deps */
import { ScaffoldContainer, ThemeContainer } from "src/containers";
import { RecoilRoot } from "recoil";
import DebugObserver from "src/components/DebugObserver";

import "styles/globals.css";
import "styles/loading.css";
import "styles/calendar.css";
import "styles/scroll.css";
import "styles/custom-daterange.css";
import "styles/font.css";
import "styles/firework.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <ScaffoldContainer>
        <ThemeContainer>
          <Component {...pageProps} />
        </ThemeContainer>
      </ScaffoldContainer>
    </RecoilRoot>
  );
}

export default MyApp;
