export const lang = {
    ru: {
        menu: {
            title: 'Финансист',
            money: 'Средства: ',
            profit: 'Прибыль: ',
            navs: [
                {
                    text: "📋 Главная",
                    link: "/"
                },
                {
                    text: "💰 Счета",
                    link: "/routes/deposits"
                },
                // {
                //     text: "💼 Ценные бумаги",
                //     link: "/"
                // },
                // {
                //     text: "💸 Автоплатежи",
                //     link: "/"
                // },
                // {
                //     text: "📊 Отчёты (в разработке)",
                //     link: "/"
                // },
                {
                    text: "🔨 Настройки",
                    link: "/routes/settings"
                },
                // {
                //     text: "📱 О нас",
                //     link: "/routes/about"
                // }
            ]
        },
        welcome: {
            text: 'Выбор основной валюты',
            placeholder: 'Выбор валюты',
            button: 'Выбрать'
        },
        form: {
            title: {
                label: 'Название',
                placeholder: 'Ввод названия'
            },
            sum: {
                label: 'Сумма',
                placeholder: 'Выбор валюты',
            },
        },
        setting: {
            labelLang: 'Выбор языка',
            labelCurrency: 'Выбор основной валюты',
            button: 'Очистить данные'
        },
        deposits: {
            size: 'Размер:'
        },
        main: {
            selectDeposit: {
                label: 'Счет',
            }
        },
        modal: {
            depositList: {
                title: 'Выберите счёт',
            },
            warning: {
                title: 'Вы действительно хотите очистить все данные?',
                button: 'Да'
            }
        }
    },
    eng: {
        menu: {
            title: 'Financier',
            money: 'Total: ',
            profit: 'Profit: ',
            navs: [
                {
                    text: "📋 Main",
                    link: "/"
                },
                {
                    text: "💰 Deposits",
                    link: "/routes/deposits"
                },
                // {
                //     text: "💼 Stocks",
                //     link: "/"
                // },
                // {
                //     text: "💸 Autopayment",
                //     link: "/"
                // },
                // {
                //     text: "📊 Отчёты (в разработке)",
                //     link: "/"
                // },
                {
                    text: "🔨 Settings",
                    link: "/routes/settings"
                },
                // {
                //     text: "📱 About us",
                //     link: "/routes/about"
                // }
            ]
        },
        welcome: {
            text: 'Choice of default currency',
            placeholder: 'Select currency',
            button: 'Select'
        },
        form: {
            title: {
                label: 'Title',
                placeholder: 'Input title'
            },
            sum: {
                label: 'Sum',
                placeholder: 'Select currency',
                placeholderTotal: '0.00'
            },
        },
        setting: {
            labelLang: 'Choice of language',
            labelCurrency: 'Choice of default currency',
            button: 'Clear data'
        },
        deposits: {
            size: 'Size:'
        },
        main: {
            selectDeposit: {
                label: 'Deposit',
            }
        },
        modal: {
            depositList: {
                title: 'Select deposit',
            },
            warning: {
                title: 'Do you really want to clear all the data?',
                button: 'Yes'
            }
        }
    }
}