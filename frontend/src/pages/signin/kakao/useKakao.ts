const useKakao = () => {
  const { Kakao }: any = window;

  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: window.location.href + "signin/kakao",
      state: "userme",
    });
  };

  const getTokenByCode = (code: string) => {
    const queryString = Object.entries({
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_KAKAO_REST_KEY,
      redirect_uri: window?.location?.origin + "/signin/kakao",
      code: code,
    })
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString,
    })
      .then((res) => res.json())
      .then((json) => {
        const { access_token } = json;
        console.log(json);
        requestUserInfo(access_token);
      });
  };

  const requestUserInfo = (token: string) => {
    Kakao.Auth.setAccessToken(token);
    Kakao.API.request({
      url: "/v2/user/me",
    })
      .then(function (res: any) {
        console.log(res);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  };
  return {
    Kakao,
    loginWithKakao,
    requestUserInfo,
    getTokenByCode,
  };
};

export default useKakao;
