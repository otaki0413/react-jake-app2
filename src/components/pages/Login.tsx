import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const Login: FC = memo(() => {
  // ログイン機能で使用するカスタムフックを実行
  const { login, loading } = useAuth();
  // ユーザーID用のstate
  const [userId, setUserId] = useState("");

  // userIDの更新処理
  // textboxのイベントの型指定はよく出てくる
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  // ログインボタン押下時の処理
  const onClickLogin = () => login(userId);
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
    >
      <Box
        bg="white"
        w="sm"
        p={4}
        borderRadius="md"
        shadow="md"
      >
        <Heading
          as="h1"
          size="lg"
          textAlign="center"
        >
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack
          spacing={6}
          px={10}
          py={4}
        >
          <Input
            placeholder="ユーザーID"
            value={userId}
            onChange={onChangeUserId}
          />
          <PrimaryButton
            disabled={userId === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
