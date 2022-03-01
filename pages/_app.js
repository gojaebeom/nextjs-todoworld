/* eslint-disable react-hooks/exhaustive-deps */
import { ScaffoldContainer, ThemeContainer } from "src/containers";
import "styles/globals.css";
import "styles/font.css";
import "styles/loading.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ScaffoldContainer>
        <ThemeContainer>
          <Component {...pageProps} />
        </ThemeContainer>
      </ScaffoldContainer>
    </RecoilRoot>
  );
}

export default MyApp;
