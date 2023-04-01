import { useMessage } from "./useMessage";
import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";

// 全てのユーザーを取得する用のカスタムフック
export const useAllUsers = () => {
  // ユーザー取得時のメッセージ用のカスタムフックを実行
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  // 全てのユーザーを取得する関数
  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      // 成功時の処理
      .then((res) => {
        setUsers(res.data);
        showMessage({
          title: "ユーザー取得に成功しました。",
          status: "success",
        });
      })
      // エラー時の処理
      .catch(() => {
        showMessage({
          title: "ユーザー取得に失敗しました。",
          status: "error",
        });
      })
      // 共通処理
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 返り値
  return { getUsers, loading, users };
};
