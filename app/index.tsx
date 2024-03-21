import { useDispatch, useSelector } from "react-redux";
import Main from "./routes/main";
import { AppDispatch, RootState } from "./redux/store";
import DepositAdd from "./routes/deposits/add";
import { useEffect } from "react";
import { getDepoistStorage, getProfit, getTotal } from "./redux/walletSlice";
import { setStoragedConfig } from "./redux/configureSlice";

export default function App() {
    const deposits = useSelector((state:RootState)=>state.walletSlice.deposits);
    const dispatch = useDispatch<AppDispatch>();
    
    return (
        <>
            {
                (deposits.length === 0) ? <DepositAdd/> : <Main/>
            }
        </>
        
    )
      
}