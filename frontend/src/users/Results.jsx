import React from "react";
import { useEffect } from "react";
import { getDataServer, getResultImage } from "../api/apiCall";
import { useState } from "react";
import { getCategory, getItem } from "../api/cateGoryAnditem";
import ImageDownlad from "./ImageDownlad.jsx";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
function Results() {
  const [category, setCategory] = useState("");
  const [toastData, setTostData] = useState({});
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [color, setColor] = useState([null, null, null]);

  useEffect(() => {
    async function fetchData() {
      const responce = await getCategory();

      setCategories(responce.data);
    }
    fetchData();
  }, []);

  const nameRow = "flex flex-row mb-3 md:mr-5 lg:mr-0 ";
  const position =
    "text-center flext items-center poppins-bold text-3xl  me-3 text-gray-400 flex align-middle";
  const resultName = "poppins-semibold text-xl";
  const resultItem = "poppins-medium text-gray-600 -mt-1";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResultImage();
        const data = response.data;

        const newImages = [
          data.image1.image ? data.image1.image : null,
          data.image2.image ? data.image2.image : null,
          data.image3.image ? data.image3.image : null,
        ];

        const newColor = [
          data.image1.color ? data.image1.color : null,
          data.image2.color ? data.image2.color : null,
          data.image3.color ? data.image3.color : null,
        ];

        setImages(newImages);
        setColor(newColor);

        // Logging the URLs directly
        newImages.forEach((image, index) => {
          if (image) {
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    async function fetchData() {
      const responce = await getItem(selectedCategory);

      setItems(responce.data || []);
    }
    fetchData();
  };

  const handleItemData = async (event) => {
    const itemValue = event.target.value;
    setSelectedItem(itemValue);

    try {
      toast.loading("Waiting...");
      const response = await getDataServer(itemValue, category);

      const { success, message, data } = response;

      setTostData({
        category: data?.category?.categoryName,
        item: data?.item?.itemName,
      });
      toast.dismiss();
      setResults(data);
      if (success) {
        toast.success(
          `Yes, ${data?.category?.categoryName} ${data?.item?.itemName} result published`
        );
      } else {
        toast(
          `NO,  ${data?.category?.categoryName} ${data?.item?.itemName}result published Yet`
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.dismiss();
      toast.error("Failed to fetch results. Please try again.");
    }
  };
  return (
    <>
      <div id="results" className="w-full text-center ">
        <h2 className="py-5 md:py-10 text-4xl lg:text-5xl  font-bold">
          Results
        </h2>
        <div className="flex md:flex-row flex-col md:justify-between  poppins-medium   space-y-1.5 pt-5 lg:pt-10 md:space-y-0 px-10 py-10 lg:py-20 xl:px-56">
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl poppins-medium  text-[#151622]">
              Category
            </label>
            <select
              onChange={handleCategoryChange}
              className="p-2 w-full font-medium text-white bg-black rounded md:text-lg md:p-3 md:px-8 "
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category?._id}>
                  {category?.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 items-start">
            <label className="text-xl poppins-medium  text-[#151622]">
              Item
            </label>
            <select
              id="item"
              onChange={handleItemData}
              className="p-2 w-full font-medium text-white bg-black rounded md:text-lg md:p-3 md:px-8"
            >
              <option value="">Select Item</option>
              {items.map((item) => (
                <option key={item._id} value={item?._id}>
                  {item?.itemName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {results?.result && (
          <>
            <div className="flex flex-col ml-16 md:flex-row justify-between  lg:px-52 ">
              <div className={nameRow}>
                <div className={position}>01</div>
                <div className="text-start">
                  <p className={resultName}>{results.result[0].firstPrize}</p>
                  <p className={resultItem}>{results.result[0].firstTeam}</p>
                </div>
              </div>
              <div className={nameRow}>
                <div className={position}>02</div>
                <div className="text-start">
                  <p className={resultName}>{results.result[1].secPrize}</p>
                  <p className={resultItem}>{results.result[1].secTeam}</p>
                </div>
              </div>
              <div className={nameRow}>
                <div className={position}>03</div>
                <div className="text-start">
                  <p className={resultName}>{results.result[2].thirdPrize}</p>
                  <p className={resultItem}>{results.result[2].thirdTeam}</p>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 px-4 py-6 sm:px-8 sm:py-8 overflow-scroll hide-scrollbar::-webkit-scrollbar hide-scrollbar  lg:px-20 lg:py-12 lg:grid-cols-2 xl:grid-cols-3 ${
                results ? "bg-slate-100" : ""
              } lg:px-28 `}
            >
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[0]}
                color={`text-${color[0]}`}
              />
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[1]}
                color={`text-${color[1]}`}
              />
              <ImageDownlad
                results={results}
                category={results?.category?.categoryName}
                item={results?.item?.itemName}
                image={images[2]}
                color={`text-${color[2]}`}
              />
            </div>
          </>
        )}
        <div className="flex justify-center">
          {results?.result == false && (
            <div className="bg-yellow-100 border-l-4 mx-10 text-center border-yellow-500 text-yellow-700 p-4 mt-4 rounded-md">
              <h2 className="font-bold text-lg">Notice:</h2>
              <p className="mt-2">
                {`The results for the ${toastData.category} ${toastData.item} Competition have not
              yet been published. Please check back later for updates`}
              </p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Results;
