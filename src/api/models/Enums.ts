export enum TriggerMode {
    TriggerAutomatically = 0,
    TriggerWithConfirm = 1,
    TriggerManually = 2,
    TriggerCheckOutPageInOnlineOrderingApp = 3,
    TriggerFirstOrderInOnlineOrderingApp = 4
}

export enum RunType {
    TypeUndefined = 0,
    RunOnce = 1,
    RunMultiple = 2
}

export enum OutcomePriceType {
    FlatDiscount = 0,
    PercentageDiscount = 1,
    FixedPrice = 2,
    FreeUpToValue = 3
}

export enum OutcomeType {
    Default = 0,
    Products = 1,
    FromCategories = 2,
    FromTags = 3,
    Categories = 4,
    Tags = 5
}

export enum OrderType {
    OrderTypeEatIn = 2,
    OrderTypeTakeaway = 3,
    OrderTypeBuzzer = 9,
    OrderTypeDelivery = 10
}

export enum PriceTriggerType {
    wholeOrderDiscountPriceTriggers = 0,
    rollIntoMealPriceTriggers = 1,
    perItemDiscountPriceTriggers = 2
}