import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

export const UserManagement: FC = memo(() => {
  // 全てのユーザーを取得する用のカスタムフックを実行
  const { getUsers, loading, users } = useAllUsers();

  // 初回マウント時に getUsers を実行する
  useEffect(() => getUsers, []);

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
          {users?.map((user) => (
            <WrapItem key={user.id}>
              <UserCard
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
