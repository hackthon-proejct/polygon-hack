import { BountyDataFrag } from "@gql/__generated__/BountyDataFrag";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyStatus } from "@shared/enums";
import BountyCreatorNegotiate from "./states/UNCLAIMED/";
import BountyNegotiate from "./BountyNegotiate";
import BountySubmit from "./BountySubmit";
import BountyUnclaimed from "./states/UNCLAIMED";
import BountyClaimed from "./states/CLAIMED";
import BountyDraft from "./states/DRAFT";
import BountyNegotiating from "./states/NEGOTIATING";

type Props = { bounty: BountyQuery_bounty };

export default function BountyState({ bounty }: Props) {
  switch (bounty.status) {
    case BountyStatus.DRAFT:
      return <BountyClaimed bounty={bounty} />;
    // return <BountyDraft bounty={bounty} />;
    case BountyStatus.UNCLAIMED:
      return <BountyUnclaimed bounty={bounty} />;
    case BountyStatus.NEGOTIATING:
      return <BountyNegotiating bounty={bounty} />;
    case BountyStatus.CLAIMED:
      return <BountyClaimed bounty={bounty} />;
    default:
      return null;
  }
}
