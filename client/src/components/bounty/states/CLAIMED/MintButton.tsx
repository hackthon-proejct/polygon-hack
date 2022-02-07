import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { MINT_SUBMISSION } from "@gql/submissions.graphql";
import {
  MintSubmission,
  MintSubmissionVariables,
} from "@gql/__generated__/MintSubmission";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { Upload } from "react-feather";

type Props = {
  submissionId: string;
  onSuccess: (mutationResp: MintSubmission["createSubmission"]) => void;
  [x: string]: any;
};

export default function MintButton({
  submissionId,
  onSuccess,
  ...props
}: Props) {
  const [
    mintSubmission,
    { loading: isMintingSubmission, error: errorMintingSubmission },
  ] = useMutation<MintSubmission, MintSubmissionVariables>(MINT_SUBMISSION);

  return (
    <Button
      isLoading={isMintingSubmission}
      width="240px"
      onClick={async () => {
        try {
          const submissionResp = await mintSubmission({
            variables: {
              id: submissionId,
            },
          });

          if (submissionResp?.data?.createSubmission) {
            onSuccess(submissionResp?.data?.mintSubmission);
          }
        } catch (e: any) {
          alert("something went wrong");
        }
      }}
      {...props}
    >
      Mint
    </Button>
  );
}
