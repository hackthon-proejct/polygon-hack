import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// TODO: ideally this is shared with server
export type TimeSecondsType =
  | 172800
  | 604800
  | 1209600
  | 2629746
  | 5259492
  | 7889238;

// TODO: ideally this is shared with server
export type TimeStringType =
  | "48 hours"
  | "1 week"
  | "2 weeks"
  | "1 month"
  | "2 months"
  | "3 months";

export type BountyDataType = {
  id: string;
  creator_id: string;
  metadata: {
    title: string;
    description: string;
    pitch?: string;
    specs: {
      resX: number;
      resY: number;
    };
    maxValue: number;
    mustBeClaimedTime: number;
    timeLimit: number;
  };
};
