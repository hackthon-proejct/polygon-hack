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
  switch (bounty.status) {
    case BountyStatus.DRAFT:
      // return <BountyUnclaimed bounty={bounty} />;
      // return <BountyNegotiating bounty={bounty} />;
      //   return <BountyClaimed bounty={bounty} />;
      // return <BountySucceeded bounty={bounty} />;
      return <BountyDraft bounty={bounty} />;
    case BountyStatus.UNCLAIMED:
      return <BountyUnclaimed bounty={bounty} />;
    case BountyStatus.NEGOTIATING:
      return blockState?.status === "2" ? (
        <BountyClaimed bounty={bounty} />
      ) : (
        <BountyNegotiating bounty={bounty} />
      );
    case BountyStatus.CLAIMED:
      return <BountyClaimed bounty={bounty} />;
    case BountyStatus.SUCCEEDED:
      return <BountySucceeded bounty={bounty} />;
    default:
      return null;
  }
}
