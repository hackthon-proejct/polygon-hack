import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLUpload } from "graphql-upload";

import Submission from "../models/Submission.model";
import User from "../models/User.model";
import Web3PublicKey from "../models/Web3PublicKey.model";
import { BountyType, SubmissionType } from "./types";
import s3 from "../utils/s3";
import config from "../../config";

const SubmissionQueries = {
  submission: {
    type: SubmissionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Submission.findByPk(args.id);
    },
  },
  submissionsForBounty: {
    type: new GraphQLList(SubmissionType),
    args: {
      bounty_id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Submission.findAll({
        where: {
          bounty_id: args.bounty_id,
        },
      });
    },
  },
};

const SubmissionMutations = {
  createSubmission: {
    type: SubmissionType,
    args: {
      bounty_id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      milestone: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      image: {
        description: "Image file",
        type: GraphQLUpload,
      },
      description: {
        description: "description of the submission",
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const { filename, mimetype, createReadStream, encoding } =
        await args.image;
      const fileChunks = [];
      const stream = createReadStream();
      stream.on("readable", () => {
        let chunk;
        while (null !== (chunk = stream.read())) {
          fileChunks.push(chunk);
        }
      });

      let imageUrl = null;
      // TODO: handle errors
      await new Promise<void>((resolve) =>
        stream.on("end", async () => {
          const imageBuffer = Buffer.concat(fileChunks);
          imageUrl = await s3.uploadFile(
            config.aws.UPLOAD_BUCKET,
            filename,
            mimetype,
            imageBuffer
          );
          resolve();
        })
      );

      return await Submission.create({
        metadata: {
          image_url: imageUrl,
          milestone: args.milestone,
        },
        bounty_id: args.bounty_id,
      });
    },
  },
  mintSubmission: {
    type: SubmissionType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const submission = await Submission.findByPk(args.id);
      await submission.mint();
      return submission;
    },
  },
};

export { SubmissionQueries, SubmissionMutations };
