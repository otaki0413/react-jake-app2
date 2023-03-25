import {
  LoginUserContext,
  LoginUserContextType,
} from "./../providers/LoginUserProvider";
import { useContext } from "react";

// コンテキストの値を参照できるカスタムフック
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);

