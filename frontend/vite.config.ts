import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.KAKAO_REST_KEY);
  return {
    plugins: [react()],
    define: {
      "process.env": {
        KAKAO_REST_KEY: env.KAKAO_REST_KEY,
      },
    },
  };
});
