import { defaultFetch } from "./axios-client";

export async function signIn({ id, password }) {
  return await defaultFetch("/login", {
    method: "POST",
    body: JSON.stringify({ id, password }),
  });
}

// 추후 서버 방식에 따라 수정
