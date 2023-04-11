import { createContainer } from "unstated-next";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useKakao from "./useKakao";

const PageSigninKakaoContainer = createContainer(() => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { getTokenByCode } = useKakao();

  useEffect(() => {
    console.log(code);
    if (code) {
      getTokenByCode(code);
    }
  }, [code]);
  return {};
});

const PageSigninKakaoContent = () => {
  return <div>hihi kakao</div>;
};

const PageSigninKakao = () => {
  return (
    <PageSigninKakaoContainer.Provider>
      <PageSigninKakaoContent />
    </PageSigninKakaoContainer.Provider>
  );
};

export default PageSigninKakao;
