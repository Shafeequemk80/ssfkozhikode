import React, { useEffect, useState } from "react";
import { getTeam, postDataServer } from "../api/apiCall.js";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getCategory, getItem } from "../api/cateGoryAnditem.js";
import { fieldNames } from "../data.js";
import { canAddResult } from "../utils/checkProgramStarted.js";

function AddResults() {
  const navigate = useNavigate()
  const [checkStarted, setCheckStart] = useState(false)
  const [category, setcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [teams, setTeams] = useState([])
  const [formData, setFormData] = useState({

    itemId: "",
    firstPrize: "",
    firstTeam: "",
    secPrize: "",
    secTeam: "",
    thirdPrize: "",
    thirdTeam: "",
  });

  useEffect(() => {

    async function fetchData() {
      try {
        const isStarted = await canAddResult(); // should return something like { success: true/false }
        setCheckStart(isStarted); // allow form
        if (!isStarted)return  navigate('/admin'); // redirect if already started

      } catch (error) {
        console.error("Error checking program start status:", error);
      }
    }

    fetchData();
  }, []);


  useEffect(() => {


    async function fetchData() {
      const responce = await toast.promise(
        getCategory(),
        {
          loading: 'Loading...',
          success: 'Category Data successfully!',
          error: 'Failed to fetch Team Data.',
        }
      )
     

      setCategories(responce.data)
    }
    fetchData()
  }, [])


  useEffect(() => {


    async function fetchData() {
      const responce = await getTeam()


      setTeams(responce.data)
    }
    fetchData()
  }, [])
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setcategory(selectedCategory);



    async function fetchData() {
      const responce = await toast.promise(
        getItem(selectedCategory),
        {
          loading: 'Loading...',
          success: 'Category Data successfully!',
          error: 'Failed to fetch Team Data.',
        }
      )

      setItems(responce.data)
    }
    fetchData()
  };

  const handleformData = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlesumbit = async (event) => {
    event.preventDefault()


    const postData = {
      categoryId: category,
      ...formData,
    };

    // for (const [key, value] of Object.entries(postData)) {
    //   if (value === undefined || value === "" || value === null) {
    //     toast.error(`Please fill in the ${fieldNames[key] || key}`);
    //     return;
    //   }
    // }
    toast.loading('Waiting...');

    const data = await postDataServer(postData);
    toast.dismiss()
    toast.success('Successfully Added!');
    setFormData({

      itemId: "",
      firstPrize: "",
      firstTeam: "",
      secPrize: "",
      secTeam: "",
      thirdPrize: "",
      thirdTeam: "",
    })
  };

  const divResult = 'flex flex-col gap-2 bg-[#ffe7b0] rounded px-5 py-6'
  const textResult = 'text-2xl font-semibold text-black  rounded'
  return (

    <div>
      {checkStarted && (
        <>
          <form
            onSubmit={handlesumbit}
            className="flex flex-col min-h-screen space-y-12 p-10 md:py-24 lg:px-20 xl:px-56"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center ">
              <h2 className="text-3xl lg:text-4xl font-bold ">Upload Results Here</h2>
              {/* <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto text-center">
    <button 
      onClick={() => navigate('/admin/AddImage')}
      className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
    >
      Add Image
    </button>
    <button 
      onClick={() => navigate('/')}
      className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
    >
      Go Home
    </button>
  </div> */}
            </div>


            <div className="flex flex-col space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-7 lg:gap-10">
                <div className="flex flex-col gap-2">
                  <label for="category" className="text-lg font-medium ">
                    Category
                  </label>
                  <select
                    onChange={handleCategoryChange}
                    id="category"
                    className="w-full h-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                  >
                    <option value="">Select Category</option>
                    {categories.length > 0 && categories.map((catecory) => (
                      <option key={catecory?._id} value={catecory?._id}>
                        {catecory?.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label for="item" className="text-lg font-medium ">
                    Item
                  </label>
                  <select
                    id="itemId"
                    value={formData.itemId}
                    onChange={handleformData}
                    className="w-full h-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
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
              <div className="grid grid-cols-1 grid-rows-3 gap-7 lg:gap-10">
                {/* first */}
                <div className={divResult}>
                  <h1 className={textResult}>
                    First Price
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-5">
                    <div className="flex flex-col gap-2">
                      <label for="firstName" className="font-medium text-lg">
                        Name
                      </label>
                      <input
                        id="firstPrize"
                        value={formData.firstPrize}
                        onChange={handleformData}
                        className="w-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label for="firstSector" className="font-medium text-lg">
                        Team{" "}
                      </label>
                      <select
                        id="firstTeam"
                        value={formData.firstTeam}
                        onChange={handleformData}
                        className="w-full h-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                      >
                        <option value="">Select Team</option>
                        {teams.map((item) => (
                          <option key={item?.teamName} value={item?.teamName}>
                            {item?.teamName
                            }
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* second */}
                <div className={divResult}>
                  <h1 className={textResult}>
                    Second Price
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-5">
                    <div className="flex flex-col gap-2">
                      <label for="secondName" className="font-medium text-lg">
                        Name
                      </label>
                      <input
                        id="secPrize"
                        value={formData.secPrize}
                        onChange={handleformData}
                        className="w-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label for="secondSector" className="font-medium text-lg">
                        Team
                      </label>
                      <select
                        id="secTeam"
                        value={formData.secTeam}
                        onChange={handleformData}
                        className="w-full h-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                      >
                        <option value="">Select Team</option>

                        {teams.map((item) => (
                          <option key={item?.teamName} value={item?.teamName}>
                            {item?.teamName
                            }
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* third */}
                <div className={divResult}>
                  <h1 className={textResult}>
                    Third Price
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-5">
                    <div className="flex flex-col gap-2">
                      <label for="thirdName" className="font-medium text-lg">
                        Name
                      </label>
                      <input
                        id="thirdPrize"
                        value={formData.thirdPrize}
                        onChange={handleformData}
                        className="w-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label for="thirdSector" className="font-medium text-lg">
                        Team
                      </label>
                      <select
                        id="thirdTeam"
                        value={formData.thirdTeam}
                        onChange={handleformData}
                        className="w-full h-full p-2 border rounded bg-slate-50 hover:bg-slate-100"
                      >
                        <option value="">Select Team</option>
                        {teams.map((item) => (
                          <option key={item?.teamName} value={item?.teamName}>
                            {item?.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="sumbit"
              className="w-full p-3 px-12 text-xl font-semibold text-white rounded shadow-md bg-black hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
       
          <Toaster />
        </>
      )}
    </div>
  );
}

export default AddResults;
