import { useAppSelector } from "@redux/hooks";
import { selectUserId } from "@redux/slices/userSlice";
import Board from "./Board";

function Me() {
  // fetch the user info and their bounties from graphql
  const userId = useAppSelector(selectUserId);
  return <Board boardId={userId} />;
}

export default Me;
