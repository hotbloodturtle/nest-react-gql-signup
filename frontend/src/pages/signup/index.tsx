import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import { createContainer } from "unstated-next";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/common/Alert";
import { SignupInput } from "../../gql/generated/graphql";
import { SignupMutationDocument } from "../../gql/mutations";

const SignupContainer = createContainer(() => {
  const navigate = useNavigate();
  const [mutation] = useMutation(SignupMutationDocument);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupInput & { passwordConfirm: string }>();
  const signup = handleSubmit(
    (data: SignupInput & { passwordConfirm: string }) => {
      if (data.password !== data.passwordConfirm) {
        setError("root", { message: "비밀번호가 일치하지 않습니다." });
        setTimeout(clearErrors, 3000);
        return;
      }
      const { passwordConfirm, ...input } = data;
      mutation({
        variables: { input },
        onCompleted: () => navigate("/", { replace: true }),
        onError: (error) => setError("root", { message: error.message }),
      });
    }
  );
  return { signup, register, errors };
});

const ContentSignUp = () => {
  const { signup, register, errors } = SignupContainer.useContainer();
  return (
    <>
      {errors.root?.message && <Alert text={errors.root.message} />}
      {Object.entries(errors).map(([key, value]) => (
        <Alert key={key} text={value.message || "항목을 입력해주세요."} />
      ))}
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <section className="card w-full max-w-2xl rounded-xl bg-base-100 p-20 shadow-xl">
          <h1 className="mb-2 text-center text-2xl font-semibold">회원가입</h1>
          <form className="form-control flex  gap-2" onSubmit={signup}>
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
            <div>
              <label className="label">
                <span className="label-text text-base-content">
                  Password 확인
                </span>
              </label>
              <input
                type="password"
                className="input-bordered input w-full"
                {...register("passwordConfirm", { required: true })}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-base-content">닉네임</span>
              </label>
              <input
                type="text"
                className="input-bordered input w-full"
                {...register("name", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "닉네임은 3글자 이상이어야 합니다.",
                  },
                })}
              />
            </div>
            <button
              type="submit"
              className="btn-primary btn-lg btn mt-5 w-full"
            >
              가입하기
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

const PageSignup = () => {
  return (
    <SignupContainer.Provider>
      <ContentSignUp />
    </SignupContainer.Provider>
  );
};

export default PageSignup;
