import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, createContext, useState, useEffect } from "react";
import {auth, db} from './firebase';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [watchlist,setWatchList] = useState([]);

  const fetchCoins = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    const JsonData = await data.json();
    setCoins(JsonData);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  useEffect(() => {
    onAuthStateChanged(auth,user=>{
      if(user) setUser(user);
      else setUser(null);
    })
  },[]);
  useEffect(()=>{
    if(user){
      const coinRef = doc(db,"watchlist", user.uid); 
      var unsubscribe = onSnapshot(coinRef,coin => {
        if(coin.exists())
        {
          setWatchList(coin.data().coins);
          console.log(coin.data().coins);
        } else {
          console.log("No items in the WatchList");
        }
      })
      
      return ()=>{
        unsubscribe();
      }
    }
  },[user])


  return (
    <>
      <Crypto.Provider
        value={{
          currency,
          symbol,
          setCurrency,
          coins,
          loading,
          fetchCoins,
          alert,
          setAlert,
          user,
          watchlist,
        }}
      >
        {children}
      </Crypto.Provider>
    </>
  );
};
export default CryptoContext;

export const CryptoToContext = () => {
  return useContext(Crypto);
};
