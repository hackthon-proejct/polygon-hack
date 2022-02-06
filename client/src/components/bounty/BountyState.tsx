import { BountyDataFrag } from "@gql/__generated__/BountyDataFrag";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyStatus } from "@shared/enums";
import BountyUnclaimed from "./states/UNCLAIMED";
import BountyClaimed from "./states/CLAIMED";
import BountyDraft from "./states/DRAFT";
import BountyNegotiating from "./states/NEGOTIATING";
import BountySucceeded from "./states/SUCCEEDED";
import { BountyBlockState } from "@utils/bounty";

type Props = { bounty: BountyQuery_bounty; blockState?: BountyBlockState };

export default function BountyState({ bounty, blockState }: Props) {
  console.log("bounty", bounty, blockState);
  switch (blockState?.status) {
    case "1":
      return <BountyNegotiating bounty={bounty} />;
    case "2":
      return <BountyClaimed bounty={bounty} />;
    case "3":
      return <BountyClaimed bounty={bounty} readyToMint={true} />;
    case "4":
      return <BountySucceeded bounty={bounty} />;
    default:
      switch (bounty.status) {
        case BountyStatus.DRAFT:
          return <BountyDraft bounty={bounty} />;
        case BountyStatus.UNCLAIMED:
          return <BountyUnclaimed bounty={bounty} />;
        default:
          return null;
      }
  }
}
