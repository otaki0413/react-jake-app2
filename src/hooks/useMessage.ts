import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "success" | "warning" | "error" | "info";
};

// トースターメッセージ表示用のカスタムフック
export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;
      toast({
        title,
        status,
        position: "bottom-right",
        duration: 2000,
        isClosable: true,
      });
    },
    [toast]
  );

  return { showMessage };
};
