import { useAppSelector } from "@redux/hooks";
import { selectTwitterHandle } from "@redux/slices/userSlice";
import Board from "./Board";

function Me() {
  // fetch the user info and their bounties from graphql
  const handle = useAppSelector(selectTwitterHandle);
  if (!handle) {
    //      <LinkTwitter/>
    return <div>You need to link twitter here</div>;
  } else {
    return <Board twitterHandle={handle} />;
  }
}

export default Me;
