import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type TimeType =
  | "48 hours"
  | "1 week"
  | "2 weeks"
  | "1 month"
  | "2 months"
  | "3 months";
