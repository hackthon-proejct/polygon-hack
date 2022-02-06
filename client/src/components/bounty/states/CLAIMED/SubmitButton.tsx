import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { CREATE_SUBMISSION } from "@gql/submissions.graphql";
import {
  CreateSubmission,
  CreateSubmissionVariables,
} from "@gql/__generated__/CreateSubmission";
import { useAppSelector, useAppDispatch } from "@redux/hooks";
import { Upload } from "react-feather";

type Props = {
  description: string;
  imageFile: File;
  milestone: number;
  bountyId: string;
  onSuccess: (mutationResp: CreateSubmission["createSubmission"]) => void;
  [x: string]: any;
};

export default function UploadButton({
  onSuccess,
  bountyId,
  imageFile,
  description,
  milestone,
  ...props
}: Props) {
  const [
    createSubmission,
    { loading: isCreatingSubmission, error: errorCreatingSubmission },
  ] = useMutation<CreateSubmission, CreateSubmissionVariables>(
    CREATE_SUBMISSION
  );

  return (
    <Button
      onClick={async () => {
        const submissionResp = await createSubmission({
          variables: {
            image: imageFile,
            bounty_id: bountyId,
            milestone,
            description,
            mint_metadata: props.metadata,
          },
        });
        if (submissionResp?.data?.createSubmission) {
          onSuccess(submissionResp?.data?.createSubmission);
        } else {
          alert("something went wrong");
        }
      }}
      {...props}
    >
      Submit
    </Button>
  );
}
