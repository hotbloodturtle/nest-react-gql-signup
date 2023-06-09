import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { createContainer } from "unstated-next";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/common/Alert";
import { SigninInput } from "../../gql/generated/graphql";
import { SigninMutationDocument } from "../../gql/mutations";

const signinContainer = createContainer(() => {
  const navigate = useNavigate();
  const [mutation] = useMutation(SigninMutationDocument);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SigninInput>();

  const signin = handleSubmit((input: SigninInput) => {
    mutation({
      variables: { input },
      onCompleted: () => {
        navigate("/", { replace: true });
      },
      onError: (error) => {
        setError("root", { message: "Error! email, password invalid." });
        setTimeout(clearErrors, 3000);
      },
    });
  });

  // kakao
  const signInKakao = () => {
    const redirectUri = `${window?.location?.origin}/signin/kakao`;
    const clientId = process.env.KAKAO_REST_KEY;
    if (!redirectUri || !clientId) return;
    const kakaoAuthUrl = "https://kauth.kakao.com/oauth/authorize";
    location.href = `${kakaoAuthUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };
  return { register, signin, errors, signInKakao };
});

const ContentSignin = () => {
  const { signin, errors, register, signInKakao } =
    signinContainer.useContainer();
  return (
    <>
      {errors?.root?.message && <Alert text={errors.root.message} />}
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <section className="card w-full max-w-2xl rounded-xl bg-base-100 p-20 shadow-xl">
          <h1 className="mb-2 text-center text-2xl font-semibold">로그인</h1>
          <form className="form-control flex  gap-2" onSubmit={signin}>
            <div>
              <label className="label">
                <span className="label-text text-base-content">Email</span>
              </label>
              <input
                type="email"
                className="input-bordered input w-full"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-base-content">Password</span>
              </label>
              <input
                type="password"
                className="input-bordered input w-full"
                {...register("password", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="btn-primary btn-lg btn mt-5 w-full"
            >
              로그인
            </button>
          </form>
          <div className="h-[1px] w-full bg-base-content mt-8" />
          <div
            className="flex flex-col items-center justify-center mt-8"
            onClick={signInKakao}
          >
            SNS 로그인
          </div>
        </section>
      </div>
    </>
  );
};

const PageSignin = () => {
  return (
    <signinContainer.Provider>
      <ContentSignin />
    </signinContainer.Provider>
  );
};

export default PageSignin;
