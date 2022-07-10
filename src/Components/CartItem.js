import React,{useState,useEffect} from 'react';
import {MdAdd, MdHorizontalRule} from 'react-icons/md';
import { motion } from 'framer-motion';
import { actionType } from './../context/reducer';
import { useStateValue } from './../context/StateProvider';
let items = [];

const CartItem = ({item,setFlag,flag}) => {
    const [qty, setQty] = useState(item.qty);
    const [{ cartItems}, dispatch] = useStateValue();
    // const [items,setItems] = useState([]);

    const cartDispatch = ()=>{
        localStorage.setItem('cartItems',JSON.stringify(items));
        dispatch({
            type:actionType.SET_CART_ITEMS,
            cartItems:items
        })
    }
    
    const updateQty = (action,id)=>{
        if(action ==='add'){
            setQty(qty+1);
            cartItems.map(item => {
                if(item.id === id){
                    item.qty += 1;
                    setFlag(flag+1);
                }
            })
            cartDispatch();
        }else{
            if(qty == 1){
                items = cartItems.filter((item) => item.id !== id);
                
                setFlag(flag+1);
                cartDispatch();
            }else{
                setQty(qty-1);
                cartItems.map(item => {
                    if(item.id === id){
                        item.qty -= 1;
                        setFlag(flag + 1);
                    }
                })
                cartDispatch();
            }
        }
    }
    useEffect(()=>{
        items = cartItems;
    },[items,qty])
    return (
        <>
            <div  className='w-full p-1 px-2 rounded-lg bg-gray-600 flex items-center gap-2'>
                <img src={item?.imageURL} alt="item" className='w-20 h-20 max-w-[60px] rounded-full object-contain' />
                {/* Name Section*/}
                <div className='flex flex-col gap-2'>
                    <p className='text-base text-gray-50'>{item.title}</p>
                    <p className="text-sm block text-gray-300 font-semibold">$ {item.price * qty}</p>
                </div>
                {/*Button secction */}
                <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                    <motion.div whileTap={{ scale: 0.75 }} onClick={()=>updateQty('remove',item.id)}>
                        <MdHorizontalRule className='text-gray-50' />
                    </motion.div>
                    <p className='w-5 h-5 rounded-sm bg-gray-600 text-gray-50 flex items-center justify-center'>{qty}</p>
                    <motion.div whileTap={{ scale: 0.75 }} onClick={()=>updateQty('add',item.id)}>
                        <MdAdd className='text-gray-50' />
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default CartItem