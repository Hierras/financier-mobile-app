export enum CurrencyEnum {
    Dollar = "USD",
    Euro = "EUR",
    Rub = "RUB",
    Rupee = "INR",
    Yen = "JPY"
};

export const Currency: { [key in CurrencyEnum]: string } = {
    [CurrencyEnum.Dollar]: "$",
    [CurrencyEnum.Euro]: "€",
    [CurrencyEnum.Rub]: "₽",
    [CurrencyEnum.Rupee]: "₹",
    [CurrencyEnum.Yen]: "¥"
};