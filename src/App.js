import React, { useEffect } from 'react';
import "./App.css";
import { Header, Home, CreateItem, Error404, About, Services,} from "./Components";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from "./utils/FireBaseFunctions";
import { actionType } from './context/reducer';
import Menu from './Components/Menu';

function App() {
  const [{ foodItems }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route exact path="/*" element={<Home />} />
              <Route exact path="/createItem" element={<CreateItem />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/services" element={<Menu />} />
              <Route exact path="/menu" element={<Menu />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
        </div>



      </AnimatePresence>
    </>
  );
}

export default App;
