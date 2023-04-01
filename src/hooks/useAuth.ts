import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";

// ログイン認証のカスタムフック
export const useAuth = () => {
  const navigation = useNavigate();
  // ログイン認証時のメッセージ用のカスタムフックを実行
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  // ローディング用のstate
  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // 管理者フラグの設定
            const isAdmin = res.data.id === 10 ? true : false;
            // ログインユーザーをコンテキストに設定、管理者情報も追加
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: "ログインしました", status: "success" });
            navigation("/home");
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
          }
        })
        .catch(() =>
          showMessage({ title: "ログインできません", status: "error" })
        )
        .finally(() => setLoading(false));
    },
    [navigation, showMessage, setLoginUser]
  );
  return { login, loading };
};
