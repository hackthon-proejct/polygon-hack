export interface BountyData {
  creatorWallet: string;
  maxValue: number;
  reservePrice: number;
  pctCreatorInitialDisbursement: number;
  pctCreatorFinalDisbursement: number;
  bonusTargets: number[];
  bonusPctYeasNeeded: number[];
  bonusFailureThresholds: number[];
  mustBeClaimedTime: number;
  timeLimit: number;
}
