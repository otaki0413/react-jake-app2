import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: FC = memo(() => {
  // モーダル使用する値を取得
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 全てのユーザーを取得する用のカスタムフックを実行
  const { getUsers, loading, users } = useAllUsers();
  // 選択ユーザーと一致するユーザを取得する用のカスタムフックを実行
  const { onSelectUser, selectedUser } = useSelectUser();
  // ログインユーザーをコンテキストから取得
  const { loginUser } = useLoginUser();

  // 初回マウント時に getUsers を実行する
  useEffect(() => getUsers, []);

  // ユーザー選択時にモーダルを表示する関数
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    /**
     * 第２引数では変化可能性のある変数や関数をセットする
     * usersの初期値は[] → usersを第２引数に設定した場合は、一覧取得時にusersが最新化
     * 仮に空配列だと「関数を最初に作成した時点の内容を保持する」ためusersはnullとなる
     */
    [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap
          p={{ base: 4, md: 10 }}
          justify="center"
        >
          {users.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={() => onClickUser(user.id)}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      {/* ユーザー詳細のモーダル */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
