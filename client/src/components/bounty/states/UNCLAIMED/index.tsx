import { BountyStatus } from "@shared/enums";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  useRadioGroup,
} from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import BountyJoin from "../BountyJoin";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

import { selectUserId } from "@redux/slices/userSlice";
import { RadioCard } from "@components/RadioCard";
import bountyContract, {
  bountyDeliverableOptions,
  getEquity,
  getTimeStringFromSeconds,
  stringNumToJS,
} from "@utils/bounty";
import { TimeSecondsType, TimeStringType } from "@utils/types";
import { useEffect, useState } from "react";
import Creator from "./CreatorNegotiate";
import { web3 } from "@utils/constants";

type Props = { bounty: BountyQuery_bounty };

export default function BountyUnclaimed({ bounty }: Props) {
  const loggedInUserId = useAppSelector(selectUserId);
  // TODO: for testing only
  // isCreator = false;
  let isCreator = bounty.creator_id === loggedInUserId;

  const [equity, setEquity] = useState<string>();

  useEffect(() => {
    async function equity(contract: any) {
      const accounts = await web3.eth.getAccounts();
      const equity = await getEquity(contract, accounts[0]);
      setEquity(stringNumToJS(equity));
    }
    if (bounty.address) {
      const contract = bountyContract(bounty.address);
      equity(contract);
    }
  }, []);
  console.log("iscr", isCreator, bounty.creator_id, loggedInUserId);

  return (
    <Box>
      {isCreator ? (
        <Creator bounty={bounty} />
      ) : (
        <BountyJoin address={bounty.address} />
      )}
    </Box>
  );
}
