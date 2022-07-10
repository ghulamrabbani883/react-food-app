import React, { useState, useEffect } from 'react'
import { MdOutlineClear, MdOutlineKeyboardBackspace } from 'react-icons/md'
import { motion } from 'framer-motion';
import { useStateValue } from './../context/StateProvider';
import { actionType } from './../context/reducer';
import CartItem from './CartItem';

const CartContainer = () => {
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
    }, [tot, flag])

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: []
        })
        localStorage.setItem('cartItems', JSON.stringify([]));
    }
    return (
        <>
            <motion.div initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="fixed top-0 right-0 z-[101] w-full md:w-375 h-auto bg-white drop-shadow-md flex flex-col">
                <div className="w-full flex items-center justify-between p-4">
                    <motion.div whileTap={{ scale: 0.75 }} className='cursor-pointer' onClick={showCart}>
                        <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
                    </motion.div>
                    <p className='text-textColor text-lg font-semibold'>Cart</p>
                    <motion.p whileTap={{ scale: 0.75 }} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer  text-textColor' onClick={clearCart}>Clear <MdOutlineClear /> </motion.p>
                </div>

                {/* Bottom section */}

                <div className="w-full h-full bg-gray-800  rounded-3xl flex flex-col">
                    {/*Cart Item Section */}
                    <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                        {/* Cart Item */}
                        {cartItems && cartItems.map(item => <CartItem key={item.id} item={item} setFlag={setFlag}
                            flag={flag} />)
                        }
                    </div>

                    {/*Cart total section */}
                    <div className='w-full flex-1 bg-gray-600 rounded-lg flex flex-col items-center justify-evenly px-8 py-2'>
                        <div className="w-full flex-justify-between items-center">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">$ {tot}</p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Delivery</p>
                            <p className="text-gray-400 text-lg">$ 2.5</p>
                        </div>
                        <div className="w-full border-b border-gray-900 my-2"></div>
                        <div className="w-full flex-justify-between items-center">
                            <p className="text-gray-200 text-xl font-semibold"> Total</p>
                            <p className="text-gray-200 text-xl font-semibold">$ {tot + 2.5}</p>
                        </div>
                        {user ? (
                            <motion.button whileTap={{ scale: 0.8 }} type="button" className='w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg '>Check Out</motion.button>
                        ) : (
                            <motion.button whileTap={{ scale: 0.8 }} type="button" className='w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg '>Login to Checkout</motion.button>

                        )}
                    </div>
                </div>


            </motion.div>
        </>
    )
}

export default CartContainer