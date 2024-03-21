import { 
    IconDefinition, faWallet, faDollarSign,
    faCreditCard, faMoneyCheckAlt, faMoneyBill,
    faMobileAlt, faBank, faBitcoinSign, faPiggyBank,
    faCoins, faEuro, faPoundSign, faYenSign, faRupeeSign,
    faIdCardAlt, faClinicMedical, faCoffee, faBeer, faGift,
    faBus, faGamepad, faShoppingCart,
    faUserGraduate, faUmbrellaBeach, faGem, faTShirt, faBook,
    faFootballBall
} from "@fortawesome/free-solid-svg-icons";

export enum IconsEnum {
    Wallet, Сurrency, Card, Check, Banknote, Mobile, Bank, Crypto,
    Pig, BanknoteCoin, Euro, Pound, Yena, Rupee, InsertCard, Medical,
    Coffee, Beer, Gift, Bus, Gamepad, Cart, Graduate, Umbrella, TSirt,
    Book, Football, Gem
};

// Предположим, что у вас есть значки FontAwesome
export const Icons: { [key in IconsEnum]: IconDefinition } = {
    [IconsEnum.Wallet]: faWallet,
    [IconsEnum.Сurrency]: faDollarSign,
    [IconsEnum.Card]: faCreditCard,
    [IconsEnum.Check]: faMoneyCheckAlt,
    [IconsEnum.Banknote]: faMoneyBill,
    [IconsEnum.Mobile]: faMobileAlt,
    [IconsEnum.Bank]: faBank,
    [IconsEnum.Crypto]: faBitcoinSign,
    [IconsEnum.Pig]: faPiggyBank,
    [IconsEnum.BanknoteCoin]: faCoins,
    [IconsEnum.Euro]: faEuro,
    [IconsEnum.Pound]: faPoundSign,
    [IconsEnum.Yena]: faYenSign,
    [IconsEnum.Rupee]: faRupeeSign,
    [IconsEnum.InsertCard]: faIdCardAlt,
    [IconsEnum.Medical]: faClinicMedical,
    [IconsEnum.Coffee]: faCoffee,
    [IconsEnum.Beer]: faBeer,
    [IconsEnum.Gift]: faGift,
    [IconsEnum.Bus]: faBus,
    [IconsEnum.Gamepad]: faGamepad,
    [IconsEnum.Cart]: faShoppingCart,
    [IconsEnum.Graduate]: faUserGraduate,
    [IconsEnum.Umbrella]: faUmbrellaBeach,
    [IconsEnum.TSirt]: faTShirt,
    [IconsEnum.Book]: faBook,
    [IconsEnum.Football]: faFootballBall,
    [IconsEnum.Gem]: faGem
};