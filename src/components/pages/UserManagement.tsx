import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: FC = memo(() => {
  // モーダル使用する値を取得
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 全てのユーザーを取得する用のカスタムフックを実行
  const { getUsers, loading, users } = useAllUsers();

  // 初回マウント時に getUsers を実行する
  useEffect(() => getUsers, []);

  // ユーザー選択時にモーダルを表示する関数
  const onClickUser = useCallback(() => onOpen(), []);

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
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      {/* ユーザー詳細のモーダル */}
      <UserDetailModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
});
