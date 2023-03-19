import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";

// ログイン認証のカスタムフック
export const useAuth = () => {
  const navigation = useNavigate();
  // ローディング用のstate
  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (id: string) => {
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            navigation("/home");
          } else {
            alert("ユーザーが存在しません。");
          }
        })
        .catch(() => alert("ログインできません"))
        .finally(() => setLoading(false));
    },
    [navigation]
  );
  return { login, loading };
};
