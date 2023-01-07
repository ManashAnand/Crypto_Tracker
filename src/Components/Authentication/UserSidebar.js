import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoToContext } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import './UserSidebar.css';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebase"

export default function UserSidebar() {

    const { user,setAlert,watchlist,coins,symbol } = CryptoToContext();

    const [state, setState] = React.useState({
        right: false,
    });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

     const logOut = () => {
            signOut(auth);

            setAlert({
                open: true,
                type: "success",
                message:"Logout successfull ! Come back soon"
            })
            
            toggleDrawer();
        }

        const removeFromWatchList = async (coin) =>{
          const coinRef = doc(db,"watchlist",user.uid); 
          
          try{
            await setDoc(coinRef,
              {
                coins: watchlist.filter((watch) => watch!==coin?.id)
              },{
                merge:"true"
              });
      
              setAlert({
                open: true,
                message: `${coin.name} removed from WatchList !`,
                type: "success"
              })
      
           } catch (error){
              setAlert({
                open: true,
                message:error.message,
                type: "error"
              })
           }
          
        }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)}
            style={{
                height:38,
                width:38,
                marginLeft:15,
                cursor:"pointer",
                backgroundColor: "#EEBC1D"
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="profileContainer">
                <div className="profile">
                    <Avatar 
                        className='picture'
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <span className="userDetails">
                     {user.displayName || user.email}
                    </span>
                </div>

                <div className="watchlist">
                    <span className="watchlistSpan">
                        Watchlist
                    </span>
                  {coins.map(coin => {
                    if(watchlist.includes(coin.id))
                    {
                      return (
                        <div className="coin">
                          <span>{coin.name}</span>
                          <span style={{display:"flex", gap: 8}}>
                              {symbol}
                              {coin.current_price.toFixed(2)}
                              <AiFillDelete
                                style={{cursor:"pointer"}}
                                fontSize="16"
                                onClick={()=>removeFromWatchList(coin)}
                              />
                          </span>
                        </div>
                      )
                    }
                  })}
                </div>

                <Button
                    variant='contained'
                    className='logoutBtn'
                    onClick={logOut}
                    style={{
                      height:"8%",
                      width:"100%",
                      backgroundColor:"#EEBC1D",
                      marginTop:"20px"
                    }}
                >
                Log Out 
                </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}