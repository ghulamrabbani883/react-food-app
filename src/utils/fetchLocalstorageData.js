const fetchData = () => {
  const data =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return data;
};

const fetchCart = () => {
  const cartInfo  =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();
  return cartInfo ? cartInfo : [];
};


export  {fetchData,fetchCart};
