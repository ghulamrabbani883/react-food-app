import React, { useState } from "react";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "./../context/StateProvider";
import { actionType } from "./../context/reducer";
import HeaderDesktop from "./Headers/HeaderDesktop";
import HeaderMobile from "./Headers/HeaderMobile";
const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(true);
    }
  };
  const showCart = ()=>{
    dispatch({
      type:actionType.SET_CART_SHOW,
      cartShow : !cartShow,
    })
  }
  const Logout = () => {
    localStorage.clear("user");
    setIsMenu(false);
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    alert("Loggedout");
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/*For desktiop */}
        <HeaderDesktop isMenu={isMenu} setIsMenu={setIsMenu} login={login} Logout={Logout} user={user} showCart={showCart} cartItems={cartItems} />
      {/*For Mobile */}
      <HeaderMobile isMenu={isMenu} setIsMenu={setIsMenu} login={login} Logout={Logout} user={user}  showCart={showCart} cartItems={cartItems}/>
    </header>
  );
};

export default Header;
