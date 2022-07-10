import React, { useEffect, useRef,useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion';
import NotFound from '../../images/NotFound.svg';
import { useStateValue } from './../../context/StateProvider';
import { actionType } from "../../context/reducer";


const HomeRowContainer = ({ flag, data, scrollValue }) => {
  const fruitContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    })
    localStorage.setItem("cartItems",JSON.stringify(items));
  }
  useEffect(() => {
    fruitContainer.current.scrollLeft += scrollValue;
  }, [scrollValue])
  useEffect(()=>{
    addToCart();
  },[items])
  return (
    <>
      <div ref={fruitContainer} className={`w-full my-12 flex items-center gap-4 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'} bg-orange-50`}>
        {
          data && data.length > 0 ? data.map((item) => (
            <div key={item.id} className="w-300 min-w-[300px] my-12 md:w-350 md:min-w-[340px] h-[225px] p-4 bg-gray-100 bg-cardOverlay rounded-lg shadow-md backdrop-blur-lg hover:drop-shadow-xl flex flex-col items-center justify-between ">
              <div className="-w-full flex items-center justify-between">
                <motion.div whileHover={{ scale: 1.2 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                  <img src={item.imageURL} alt={item.name} className="w-full h-full object-contain" />
                </motion.div>
                <motion.div whileTap={{ scale: 0.75 }} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer' onClick={() => setItems([...cartItems, item])}>
                  <MdShoppingBasket className='text-white' />
                </motion.div>
              </div>
              <div className="flex w-full flex-col  items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">{item.title}</p>
                <p className='mt-1 text-gray-500'>{item.calories} Calories</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold"><span className='text-red-500'>$</span> {item.price}</p>
                </div>
              </div>
            </div>

          )) :
            <div className='w-full flex flex-col items-center justify-center'>
              <img src={NotFound} alt="NotFound" className='h-340' />
              <p className='text-lg font-bold text-headingColor my-2'>Items not found</p>
            </div>

        }
      </div>

    </>
  )
}

export default HomeRowContainer