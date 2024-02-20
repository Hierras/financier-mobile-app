enum Page {
    Main,
    MainAdd,
    Deposit,
    DepositAdd
}

interface PageIntf {
    url: string,
    title: string,
    param: string | number,
    pageId: Page,
    buttons: Buttons[] | null
}
const pages: PageIntf[] = [
    {
        pageId: Page.Main,
        url: '/main',
        title: string,
        param: string | number,
        
        buttons: Buttons[] | null
    }
]
// const Main = {
//     url: '/',
//     title:
// }