import { useCallback, useState } from "react";
import { User } from "../types/api/user";

type Props = {
  id: number;
  users: Array<User>;
  onOpen: () => void;
};

// 選択したユーザー情報を特定してモーダルを表示するカスタムフック
export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const onSelectUser = useCallback((props: Props) => {
    console.log(props);
    const { id, users, onOpen } = props;
    // idに一致するユーザー特定
    const targetUser = users.find((user) => user.id === id);
    setSelectedUser(targetUser);
    onOpen();
  }, []);

  // 返り値
  return { onSelectUser, selectedUser };
};
