export interface BountyData {
  creatorWallet: string;
  maxValue: number;
  bonusTargets: number[];
  bonusPctYeasNeeded: number[];
  bonusFailureThresholds: number[];
  mustBeClaimedTime: number;
  timeLimit: number;
}
