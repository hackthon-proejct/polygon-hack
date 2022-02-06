import config from "../../../../config";
import logger from "../../logger";
import { awsUploadFile } from "./aws";
import { pinataUploadFile } from "./pinata";

export interface UploadResult {
  link: string;
  name: string;
}

export async function uploadToCloudFS(
  filename: string,
  imageBytes: Buffer,
  manifest: any,
  provider: "aws" | "pinata"
): Promise<UploadResult> {
  logger.info("uploadToCloudFS: ", {
    filename,
    manifest,
    provider,
  });
  try {
    let imgUrl;
    if (provider === "aws") {
      imgUrl = await awsUploadFile(
        filename,
        "image/png",
        imageBytes,
        config.aws.UPLOAD_BUCKET
      );
    } else {
      const imgHash = await pinataUploadFile(filename, imageBytes);
      imgUrl = `ipfs://${imgHash}`;
    }
    // Edit the manifest json with the newly uploaded image url
    manifest.image = imgUrl;
    // This is just to set the manifest filename to {imagename}.json
    const manifestName = `${filename}.json`;
    let manifestUrl;
    const manifestBytes = Buffer.from(JSON.stringify({ ...manifest }));
    if (provider === "aws") {
      manifestUrl = await awsUploadFile(
        manifestName,
        "application/json",
        manifestBytes,
        config.aws.UPLOAD_BUCKET
      );
    } else {
      const manifestHash = await pinataUploadFile(manifestName, manifestBytes);
      manifestUrl = `ipfs://${manifestHash}`;
    }
    if (manifestUrl) {
      return {
        link: manifestUrl,
        name: manifest.name,
      };
    }
  } catch (err) {
    logger.error("uploadToCloudFS: ", { err });
    throw err;
  }
}
