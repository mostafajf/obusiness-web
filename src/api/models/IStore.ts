import { IOperatingHours } from './IOperatingHours';
import { TriggerMode, OutcomeType, OrderType, RunType, OutcomePriceType, PriceTriggerType } from './Enums';

export interface IStore {
    name: string;
    menus: string[];
    deliveryRules: string;
    timezoneIanaFormat: string;
    qRTemplate: string;
    website: string;
    introImage: string;
    profileImage: string;
    chargeToRoom: boolean;
    closingStoreMessage: string;
    company_Id: string;
    contactEmail: string;
    logo: string;
    mobilePhone: string;
    officePhone: string;
    displayOrder: number;
    orderPreparationTime: number;
    isEnabled: boolean;
    isHQ: boolean;
    hQCompanyID: string;
    isInOperation: boolean;
    isTest: boolean;
    location: Location;
    operatingHours: IOperatingHours[];
    menuTimeSettings: IMenuTimeSetting[];
    deliveryAreas: IDeliveryArea[];
    paymentConfigEnvironment: string;
    registrationNumber: string;
    storeTitle: string;
    timezoneCity: string;
    pointsToDollarRatio: number;
    isEarnPointsWhenRedeem: boolean;
    earningRules: IEarningRule[];
    redemptionRules: IRedemptionRule[];
    priceTriggers: { [key: string]: IPriceTrigger; };
    themeSettings: IThemeSettings;
}

export interface IThemeSettings {

}

export interface IDeliveryArea {
    postcodeFrom: string;
    postcodeTo: string;
}

export interface IMenuTimeSetting {
    dayOfWeek: string;
    startTime: string;
    endtime: string;
    menuType: string;
}

export interface IEarningRule {
    disabled: boolean;
    dollarSpent: number;
    expiredDate: any;
    point: number;
    rewardPointRuleId: number;
}

export interface IRedemptionRule {
    disable: boolean;
    discountAmount: number | null;
    discountRate: number | null;
    dollarSpend: number;
    expiredDate: any;
    isDiscountExcludeVariants: boolean;
    isHQ: boolean;
    name: string;
    point: number;
    productVariant: number;
    rewardPointId: number;
    uniqueCode: string;
    categories: number[];
    tags: number[];
}

export interface IPriceTrigger {
    iD: number;
    discountFlatValue: number;
    discountPercentageValue: number;
    endAt: any;
    endAtDatetime: string | null;
    startAt: any;
    startAtDatetime: string | null;
    fixedPriceValue: number | null;
    isDisabled: boolean;
    isMostExpensiveFirst: boolean;
    isOutcomeLinkedToProduct: boolean;
    membershipLevelID: string;
    minimumSpend: number | null;
    name: string;
    notApplicableWithCoupon: boolean;
    orderType: OrderType | null;
    outcomePriceType: OutcomePriceType;
    outcomeType: OutcomeType | null;
    priority: number;
    triggerMode: TriggerMode;
    runType: RunType;
    productCategoryConditions: IProductCategoryCondition[];
    productTagConditions: IProductTagCondition[];
    customerTags: string[];
    productOutcomes: IProductOutcome[];
    productOutcomesCategory: IProductCategoryCondition[];
    productTagOutcomes: IProductTagCondition[];
    orderUID: string;
    priceTriggerType: PriceTriggerType | null;
    appliedQuantity: number | null;
    appliedDiscount: number | null;
    productID: string;
}

export interface IProductCategoryCondition {
    productCategoryID: string;
    quantity: number;
}

export interface IProductTagCondition {
    productTagID: string;
    quantity: number;
}

export interface IProductOutcome {
    productID: string;
    quantity: number;
}