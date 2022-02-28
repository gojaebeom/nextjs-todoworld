/* eslint-disable react-hooks/exhaustive-deps */
import { CredentialsContainer, ThemeContainer } from "src/containers";
import "styles/globals.css";
import "styles/font.css";
import "styles/loading.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CredentialsContainer>
        <ThemeContainer>
          <Component {...pageProps} />
        </ThemeContainer>
      </CredentialsContainer>
    </RecoilRoot>
  );
}

export default MyApp;
