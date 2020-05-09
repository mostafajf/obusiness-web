import { OperatingHours } from "./OperatingHours";
import {
  TriggerMode,
  OutcomeType,
  OrderType,
  RunType,
  OutcomePriceType,
  PriceTriggerType
} from "./Enums";

export class Store {
  name?: string;
  menus?: string[];
  deliveryRules?: string;
  timezoneIanaFormat?: string;
  qRTemplate?: string;
  website?: string;
  introImage?: string;
  profileImage?: string;
  chargeToRoom?: boolean;
  closingStoreMessage?: string;
  company_Id?: string;
  contactEmail?: string;
  logo?: string;
  mobilePhone?: string;
  officePhone?: string;
  displayOrder?: number;
  orderPreparationTime?: number;
  isEnabled?: boolean;
  isHQ?: boolean;
  hQCompanyID?: string;
  isInOperation?: boolean;
  isTest?: boolean;
  location?: Location;
  operatingHours?: OperatingHours[];
  menuTimeSettings?: MenuTimeSetting[];
  deliveryAreas?: DeliveryArea[];
  paymentConfigEnvironment?: string;
  registrationNumber?: string;
  storeTitle?: string;
  timezoneCity?: string;
  pointsToDollarRatio?: number;
  isEarnPointsWhenRedeem?: boolean;
  earningRules?: EarningRule[];
  redemptionRules?: RedemptionRule[];
  priceTriggers?: { [key: string]: PriceTrigger };
  themeSettings?: ThemeSettings;
}

export class ThemeSettings {}

export class DeliveryArea {
  postcodeFrom?: string;
  postcodeTo?: string;
}

export class MenuTimeSetting {
  dayOfWeek?: string;
  startTime?: string;
  endtime?: string;
  menuType?: string;
}

export class EarningRule {
  disabled?: boolean;
  dollarSpent?: number;
  expiredDate?: any;
  point?: number;
  rewardPointRuleId?: number;
}

export class RedemptionRule {
  disable?: boolean;
  discountAmount?: number | null;
  discountRate?: number | null;
  dollarSpend?: number;
  expiredDate?: any;
  isDiscountExcludeVariants?: boolean;
  isHQ?: boolean;
  name?: string;
  point?: number;
  productVariant?: number;
  rewardPointId?: number;
  uniqueCode?: string;
  categories?: number[];
  tags?: number[];
}

export class PriceTrigger {
  iD?: number;
  discountFlatValue?: number;
  discountPercentageValue?: number;
  endAt: any;
  endAtDatetime?: string | null;
  startAt: any;
  startAtDatetime?: string | null;
  fixedPriceValue?: number | null;
  isDisabled?: boolean;
  isMostExpensiveFirst?: boolean;
  isOutcomeLinkedToProduct?: boolean;
  membershipLevelID?: string;
  minimumSpend?: number | null;
  name?: string;
  notApplicableWithCoupon?: boolean;
  orderType?: OrderType | null;
  outcomePriceType?: OutcomePriceType;
  outcomeType?: OutcomeType | null;
  priority?: number;
  triggerMode?: TriggerMode;
  runType?: RunType;
  productCategoryConditions?: ProductCategoryCondition[];
  productTagConditions?: ProductTagCondition[];
  customerTags?: string[];
  productOutcomes?: ProductOutcome[];
  productOutcomesCategory?: ProductCategoryCondition[];
  productTagOutcomes?: ProductTagCondition[];
  orderUID?: string;
  priceTriggerType?: PriceTriggerType | null;
  appliedQuantity?: number | null;
  appliedDiscount?: number | null;
  productID?: string;
}

export class ProductCategoryCondition {
  productCategoryID?: string;
  quantity?: number;
}

export class ProductTagCondition {
  productTagID?: string;
  quantity?: number;
}

export class ProductOutcome {
  productID?: string;
  quantity?: number;
}
