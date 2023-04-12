import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { KaKaoSigninMutationDocument } from "../../../gql/mutations";

const PageSigninKakao = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");
  const [mutation] = useMutation(KaKaoSigninMutationDocument, {
    onCompleted: () => navigate("/"),
  });
  useEffect(() => {
    if (!code) return;
    mutation({ variables: { code } });
  }, [code]);
  return null;
};

export default PageSigninKakao;
