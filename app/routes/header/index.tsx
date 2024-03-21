import { View, Pressable, Text, StyleProp, ViewStyle } from "react-native";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../colors";
import { Props } from "@fortawesome/react-native-fontawesome";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { openMenu, setStoragedConfig } from "../../redux/configureSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageIntf, Pages } from "../../Types/pages";
import { router, useGlobalSearchParams, usePathname } from "expo-router";
import { AppDispatch, RootState } from "../../redux/store";
import { Currency } from "../../Types/Currencies";
import { addDeposit, decreaseDeposit, defaultDeposit, defaultOperation, getDepoistStorage, getProfit, getTotal, increaseDeposit, setCurrentDeposit, setCurrentOperation } from "../../redux/walletSlice";
import { useEffect } from "react";

export default function Header() {

    const href = usePathname();
    const { type } = useGlobalSearchParams();
    const total = useSelector((state:RootState)=>state.walletSlice.total);
    const defaultCurrency = useSelector((state:RootState)=>state.appSlice.defaultCurrency);
    const deposits = useSelector((state:RootState)=>state.walletSlice.deposits);
    const dispatch = useDispatch<AppDispatch>(); 

    // Добавление депозита/траты/дохода
    function onAccept() {
      switch (data.url) {
        case "/routes/main/add": {
          if (type === 'false') {
            dispatch(increaseDeposit());
          }
          else {
            dispatch(decreaseDeposit());
          }
          router.navigate(data.back);
          break;
        }
        case "/routes/deposits/add": {
          // if deposits.length = 0 - create id: 0 else - last id+1
          if (deposits.length === 0)
            dispatch(setCurrentDeposit({key:'id', value:0}))
          else
            dispatch(setCurrentDeposit({key:'id', value: deposits[deposits.length-1].id+1}))
          dispatch(addDeposit());
          router.navigate(data.back);
          break;
        }
        default: {
        }       
      }
      
    }
    // Возвращение назад
    function onBack() {
      switch (data.url) {
        case "/routes/main/add": {
          dispatch(setCurrentOperation({key:'full', value:''}));
          break;
        }
        case "/routes/deposits/add": {
          dispatch(setCurrentDeposit({key:'full', value:''}));
          break;
        }
        default: {
        }       
      }
      router.navigate(data.back);
    }
    // Начало процесса добавления
    function onAdd() {
      switch (data.url) {
        case "/routes/main/": {
          dispatch(setCurrentOperation({key:'all', value:defaultOperation}));
          break;
        }
        case "/routes/deposits/": {
          dispatch(setCurrentDeposit({key:'all', value:defaultDeposit}));
          break;
        }
        default: {
        }       
      }
      router.navigate(href+"/add");
    }

    // Определение набора кнопок страницы
    let data: PageIntf;
    switch (href) {
      case "/routes/main/add": {
        data = Pages.MainAdd;
        break;
      }
      case "/routes/deposits": {
        data = Pages.Deposit;
        break;
      }
      case "/routes/deposits/add": {
        data = Pages.DepositAdd;
        break;
      }
      case "/routes/settings": {
        data = Pages.Settings;
        break;
      }
      default: {
        data = (deposits.length === 0) ? Pages.DepositAdd : Pages.Main;
      }       
    }
  
    // Определение надписей
    const lang = useSelector((state:RootState)=>state.appSlice.language);
    let title;
    switch (lang){
      case 'eng':
        if (href === "/routes/main/add") {
          if (type==="false") title = data.title.eng[0];
          else title = data.title.eng[1];
        }
        else title = data.title.eng;
        break;
      default:
        if (href === "/routes/main/add") {
          if (type==="false") title = data.title.ru[0];
          else title = data.title.ru[1];
        }
        else title = data.title.ru;
    }

    // Отображение общего счёта
    let param;
    if (data.param) {
      if (defaultCurrency !== null) 
        (total.loading === 'pending') ? param = 'loading' : param = ` ${total.count.toFixed(2)} ${Currency[defaultCurrency as keyof typeof Currency]}`;
      else param = "";
    }else{
      param = "";
    }
  
    // Отображение кнопок
    let buttons;
    if (data.buttons.length !== 0) {
      buttons = data.buttons.map((v)=>{

        switch (v.action) {
          case 'back': {
            return  <Pressable key={v.icon.iconName} onPress={onBack}>
            <FontAwesomeIcon size={20} color={colors.main} icon={v.icon}/>
            </Pressable>
          }
          case 'add': {
            return <Pressable key={v.icon.iconName} onPress={onAdd}><FontAwesomeIcon size={20} color={colors.main} icon={v.icon}/></Pressable>
          }
          default: {
            return <Pressable key={v.icon.iconName} onPress={onAccept}><FontAwesomeIcon size={20} color={colors.main} icon={v.icon}/></Pressable>
          }
        }
      });
    }    
    useEffect(()=>{
        dispatch(setStoragedConfig());
        dispatch(getDepoistStorage());
        
    }, [dispatch]);

    useEffect(()=>{
      dispatch(getTotal(defaultCurrency));
      dispatch(getProfit(defaultCurrency));

    }, [dispatch, deposits, defaultCurrency]);
    return (
      <SafeAreaView style={header}>
        <View style={titleSide}>
          <View>
            <Pressable onPress={()=>dispatch(openMenu())}>
              <FontAwesomeIcon {...navIconProps} />
            </Pressable>
          </View>
          <View style={titleView}>
            <Text style={{color: colors.textgrey, fontFamily: 'Cuprum', fontSize: 16}}>
              {title} {param}
            </Text>
          </View>
        </View>
        <View style={buttonsList}>
          {buttons}
        </View>
      </SafeAreaView>
    );
  }
  const header: StyleProp<ViewStyle> = {
    maxWidth: '90%',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
  }
  const titleSide: StyleProp<ViewStyle> = {
    display: 'flex',
    flexDirection:'row',
  }
  const titleView: StyleProp<ViewStyle> = {
    marginLeft: 10
  }
  const buttonsList: StyleProp<ViewStyle> = {
    display: 'flex',
    width: '20%',
    flexDirection:'row',
    justifyContent: 'space-between'
  }
  const navIconProps: Props = {
    color: colors.main,
    size: 24,
    icon: faBars
  }