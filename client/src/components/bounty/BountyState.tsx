import { BountyDataFrag } from "@gql/__generated__/BountyDataFrag";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyStatus } from "@shared/enums";
import BountyNegotiate from "./BountyNegotiate";
import BountySubmit from "./BountySubmit";

type Props = { bounty: BountyQuery_bounty };

export default function BountyState({ bounty }: Props) {
  switch (bounty.status) {
    case BountyStatus.DRAFT:
      return <BountyNegotiate bounty={bounty} />;
    case BountyStatus.CLAIMED:
      return <BountySubmit bounty={bounty} />;
    default:
      return null;
  }
}
