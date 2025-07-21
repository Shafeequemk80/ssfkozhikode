import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa";
import { addItem, deleteItem, editItem, getCategory, getItem } from '../api/cateGoryAnditem';
import { checkProgramStarted } from '../utils/checkProgramStarted';


const AddItem = () => {
    const [formState, setFormState] = useState('');
    const [errors, setErrors] = useState('');
    const [category, setCategory] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [selectedCate, setSelectedcate] = useState('')
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
        

            setCategory(responce.data)
        }
        fetchData()
    }, [])

    const handlePointChange = (e) => {
        const text = e.target.value
        setFormState(text)
        if (errors) setErrors('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = formState.trim()
        if (trimmed === "") {
            setErrors('Item name is required')
            return;
        }

        const isDullicate = itemList.some((item) => item?.itemName.toLowerCase() === trimmed.toLowerCase())

        if (isDullicate) {
            return setErrors('item Name already exists')
        }
        try {

            const response = await toast.promise(
                addItem(selectedCate, trimmed),
                {
                    loading: 'Loading...',
                    success: 'Item Data successfully!',
                    error: 'Failed to add Item ',
                }
            )
       

            setItemList((prev) => [response.data, ...prev]);
            setErrors('')
            setFormState('')

        } catch (error) {
            console.log(error.message);

        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value

        setSelectedcate(selectedCategory)
        async function fetchData() {
            const responce = await toast.promise(
                getItem(selectedCategory),
                {
                    loading: 'Loading...',
                    success: 'Category Data successfully!',
                    error: 'Failed to fetch Team Data.',
                }
            )

            setItemList(responce.data)
        }
        fetchData()
    }

    const handleDeleteTeam = async (id) => {
  if(await checkProgramStarted())return
        Swal.fire({

            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                async function remove(id) {
                    const response = await toast.promise(deleteItem(id),
                        {
                            loading: 'Deleting...',
                            success: "Item Deleted successfully",
                            error: (err) => err.data.message || 'Failed to deleting'
                        })
                    if (response.success == true) {
                        const filteredData = itemList.filter((item) => (
                            item._id !== id
                        ))
                        setItemList(filteredData)
                    }
                }
                remove(id)

            }
        });

    }

    const handleEditItem = async (id, currentName, index) => {
  
        const { value: newName } = await Swal.fire({
            title: "Edit Item Name",
            input: "text",
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: "Edit",
            showLoaderOnConfirm: true,
            inputAttributes: {
                autocapitalize: "off"
            },
            inputValidator: (value) => {
                if (!value) {
                    return "Item name cannot be empty!";
                }
            },
            preConfirm: async (value) => {
                try {
                    const response = await editItem(id, value, selectedCate); // this should return { data, message }


                    // Update local state
                    const newItem = [...itemList];
                    newItem[index] = { ...newItem[index], itemName: value };
                    setItemList(newItem);

                    return response?.data?.message; // needed to prevent modal from staying open
                } catch (error) {
                    console.log(error.response.data);

                    const errorMessage =
                        error.response?.data?.message || error.message || "Something went wrong";
                    Swal.showValidationMessage(errorMessage);
                }
            }
        });

        // Optional confirmation
        if (newName) {
            Swal.fire({
                title: "✅ Category Updated!",
                html: `🎉 Category name updated to <span style="color:#3085d6;">${newName}</span> successfully! 🎉`,
                icon: "success"
            });
        }
    };

    return (
        <>

            <div className="border-x-2 border-b-2 border-theme_black w-full flex justify-center  items-center flex-col  md:pb-10 pt-6 px-4 lg:px-16">
                <h1 className="mb-6 text-black font-poppins font-semibold  text-center text-3xl">
                    Add Item
                </h1>
                <form onSubmit={handleSubmit} className="mb-16 border p-3 flex justify-center items-center   flex-col  md:w-[50%] gap-6 font-poppins">

                    <React.Fragment >
                        <label className="w-full cursor-pointer ">Select Gategory
                            <select
                                onChange={handleCategoryChange}
                                className="p-2 w-full font-medium text-white mt-2 bg-black rounded md:text-lg md:p-3 md:px-8 "
                            >
                                <option value="">Select Category</option>
                                {category.map((category) => (
                                    <option
                                        key={category?.categoryName} value={category?._id}>
                                        {category?.categoryName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="w-full cursor-pointer ">
                            Enter item Name
                            <input
                                type="text"
                                className={`w-full cursor-pointer border border-theme_black p-3  placeholder:text-black mt-2 ${errors ? 'border-red-500' : ''}`}
                                placeholder="Enter item name"
                                value={formState}
                                onChange={(e) => handlePointChange(e)}
                            />
                            {errors && <span className="text-red-500 text-sm">{errors}</span>}
                        </label>
                    </React.Fragment>

                    <button
                        className="border border-theme_black cursor-pointer bg-gray-900 p-3 text-white font-medium col-span-5  w-full sm:col-span-2"
                        type="submit"
                    >
                        Add Item
                    </button>
                </form>


                <div className="p-6 bg-[#FADFA1] mt-10 flex justify-center w-full">
                    <div className=" w-full lg:w-2/3">
                        <h1 className="text-4xl text-center font-bold mb-6 text-black">Category</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-lg rounded-lg">
                                <thead>
                                    <tr className="bg-[#9fb973] text-white">
                                        <th className="py-md-3 px-md-4  py-1 px-1 rounded-tl-lg" scope="col">No</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1" scope="col">Category</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1 " scope="col">Edit</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1 rounded-tr-lg" scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemList.length > 0 ? (
                                        itemList.map((item, index) => (
                                            <tr key={index} className={` ${index % 2 === 1 ? 'bg-orange-50' : 'bg-white'}`}>
                                                <td className='py-3 px-4   text-lg font-semibold text-gray-800'>
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-4 text-lg    text-gray-800">
                                                    {item?.itemName}
                                                </td>
                                                <td onClick={() => handleEditItem(item?._id, item?.itemName, index)} className="y-3 px-4 text-lg  text-blue-800">
                                                    <FaEdit />

                                                </td>
                                                <td onClick={() => handleDeleteTeam(item?._id)} className="y-3 px-4 text-lg cursor-pointer hover:bg-green-50 text-gray-800">
                                                    <MdDeleteForever />

                                                </td>
                                            </tr>

                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-3 px-4 text-center text-lg text-gray-500">No points available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </>
    );
};



export default AddItem;
