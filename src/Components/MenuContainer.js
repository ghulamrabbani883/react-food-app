import React, { useState,useEffect } from 'react'
import { MdFastfood } from 'react-icons/md';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import HomeRowContainer from './Home/HomeRowContainer.js';
import { useStateValue } from './../context/StateProvider';

const MenuContainer = () => {
  const [{foodItems}, dispatch] = useStateValue();
  const [filter, setFilter] = useState('fish');
  useEffect(()=>{

  },[filter])
  return (
    <>
      <div className="w-full my-6" id="menu">
        <div className="flex w-full items-center flex-col justify-center">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-100 mr-auto">Our Hot Dishesh</p>
          <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6  overflow-x-scroll scrollbar-none">
            {
              categories && categories.map((item) => (
                <motion.div whileTap={{scale:0.75}} key={item.id} onClick={()=>setFilter(item.urlParamName)} className={`group ${filter === item.urlParamName ? 'bg-red-500': 'bg-cardOverlay'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg shadow-xl flex flex-col items-center justify-center gap-3  hover:bg-red-500`}>
                  <div className={`w-10 h-10 rounded-full ${filter === item.urlParamName ? 'bg-gray-200': 'bg-red-500'} group-hover:bg-gray-200 flex items-center justify-center`}>
                    <MdFastfood className={`${filter === item.urlParamName ? 'text-red-500': 'text-gray-200'} font-bold group-hover:text-red-500`} />
                  </div>
                  <p className={`text-sm ${filter === item.urlParamName ? 'text-gray-200': 'text-textColor'} group-hover:text-gray-200`}>{item.name}</p>
                </motion.div>
              ))
            }

          </div>

          <div className="w-full ">
            <HomeRowContainer flag={false} data={foodItems?.filter((n)=>n.catagory===filter)} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuContainer