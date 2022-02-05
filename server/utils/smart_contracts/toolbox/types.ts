export interface BountyData {
  creatorWallet: string;
  maxValue: string;
  reservePrice: string;
  bonusTargets: number[];
  bonusPctYeasNeeded: number[];
  bonusFailureThresholds: number[];
  mustBeClaimedTime: number;
  timeLimit: number;
}
