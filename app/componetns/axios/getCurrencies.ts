import axios from "axios";

export async function getDefaultValue() {
    const result: {status: string, rates: object} = {status: 'error', rates:{}}
    try {
        result.rates = await axios.get('https://www.cbr-xml-daily.ru/latest.js')
        .then(r=>{
            if (r.status !== 200) throw 'Error';
            else {
                result.status = "success";
                return r.data.rates;
            }
        });
    }
    catch(e) {
        console.log(e);
    }

    if (result.status === 'error') return 0;
    else return result.rates;
}

export async function getRates(defaultCurrency: null | string, rejectWithValue:Function) {
    const rates = await getDefaultValue();
    if (rates === 0) {
        return rejectWithValue(defaultCurrency);
    }
    else {
        return {rates, defaultCurrency};
    } 
}

 // Получить значение валюты
export function getCurrencyValue(rates: object, cur: string | null) {
    if (cur !== null){
        for (let key in rates) {
            if (cur === key) {
                return rates[key as keyof typeof rates];
            }
        }
    }
    return 0;
}

export function countCurrency(c1:number | null, c2:number | null, val: number) {
    // c1 - стоимость требуемой валюты к рублю
    // c2 - стоимость переводимой валюты к рублю
    // val - сумма
    if (c1 === null && c2 !== null) {
        // Рубли - основная монета
        return val/c2;
    }
    else if (c2 === null && c1 !== null) {
        return val*c1;
    }
    else if (c1 !== null && c2 !== null){
        // Если из 1 в другую
        return val/c2*c1;
    }
    else return val;

}