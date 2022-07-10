import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdLocalFireDepartment, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, SaveItem } from './../utils/FireBaseFunctions';
import { useStateValue } from './../context/StateProvider';
import { actionType } from './../context/reducer';

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [imageStatus, setImageStatus] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const [{foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed", (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, Try Again');
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageAsset(downloadURL);
        setFields(true);
        setIsLoading(false);
        setMsg('Image Uploaded');
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      })
    })
  }
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setFields(true);
      setIsLoading(false);
      setMsg('Image Deleted');
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  }
  const saveDetail = () => {
    setIsLoading(true);
    try {
      if ((!title || !price || !catagory || !imageAsset || !calories)) {
        setFields(true);
        setMsg('Required field cant be empty');
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }else{
        const data = {
          id: `${Date.now()}`,
          title:title,
          imageURL:imageAsset,
          catagory: catagory,
          calories:calories,
          qty :1,
          price:price
        }
        SaveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data Uploaded successfully');
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
          clearData();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while uploading, Try Again');
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  }

  const clearData = ()=>{
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCatagory("");
  }
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data
      })
    })
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center  gap-4">
      <div className="w-[90%] md:w-[75%]  border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
              }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title ..."
            className="w-full h-full text-lg bg-transparent text-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <select
            name="catagories"
            id="catagories"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option key="gsas" value="other">Select Catagories</option>
            {categories &&
              categories.map((item) => (
                <option key={item.id} value={item.urlParamName}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg ">
          {
            isLoading ? <Loader /> : <>
              {
                !imageAsset ? <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">Click Here to Upload</p>
                      <input type="file" name="uploadimage" id="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0" />
                    </div>
                  </label>
                </> : <>
                  <div className="relative h-full">
                    <img src={imageAsset} alt="uploadimage" className="w-full h-full object-cover" />
                    <button type="button" className="absolute bottom-3 right-3 rounded-full text-xl cursor-pointer outline-none hover: shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}> <MdDelete className="bg-red-500 text-white rounded-3xl w-10 h-10" /> </button>
                  </div>
                </>
              }
            </>
          }
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input type="text" required placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-400 text-textColor" />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input type="text" required placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-400 text-textColor" />
          </div>
        </div>
        <div className="flex items-center w-full ">
          <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold " onClick={saveDetail}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default CreateItem;
