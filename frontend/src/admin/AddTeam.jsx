import React, { useEffect, useState } from 'react';
import { getTeam, addTeamName, deleteTeam, editTeam } from '../api/apiCall';
import toast, { Toaster } from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2'
import { FaEdit } from "react-icons/fa";
import { checkProgramStarted } from '../utils/checkProgramStarted';


const AddTeam = () => {
    const [formState, setFormState] = useState('');
    const [errors, setErrors] = useState('');
    const [teams, setTeams] = useState([]);
    useEffect(() => {


        async function fetchData() {
            const responce = await toast.promise(
                getTeam(),
                {
                    loading: 'Loading...',
                    success: 'Team Data successfully!',
                    error: 'Failed to fetch Team Data.',
                }
            )

            setTeams(responce.data)
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
            setErrors('Team name is required')
            return;
        }

        const isDullicate = teams.some((team) => team.teamName.toLowerCase() === trimmed.toLowerCase())

        if (isDullicate) {
            setErrors('Team Name already exists')
        }
        try {

            const response = await toast.promise(
                addTeamName(trimmed),
                {
                    loading: 'Loading...',
                    success: 'Team Data successfully!',
                    error: 'Failed to fetch Team Data.',
                }
            )

            setTeams((prev) => [response.data, ...prev]);
            setErrors('')
            setFormState('')

        } catch (error) {
            console.log(error.message);

        }
    };

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
                    const response = await toast.promise(deleteTeam(id),
                        {
                            loading: 'Deleting...',
                            success: "Team Deleted successfully",
                            error: (err) => err.data.message || 'Failed to deleting'
                        })
                    if (response.success == true) {
                        const filteredData = teams.filter((item) => (
                            item._id !== id
                        ))
                        setTeams(filteredData)
                    }
                }
                remove(id)

            }
        });

    }

    const handleEditTeam = async (id, currentName, index) => {
           if(await checkProgramStarted())return   
        const { value: newName } = await Swal.fire({
            title: "Edit Team Name",
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
                    return "Team name cannot be empty!";
                }
            },
            preConfirm: async (value) => {
                try {
                    const response = await editTeam(id, value); // this should return { data, message }


                    // Update local state
                    const newTeam = [...teams];
                    newTeam[index] = { ...newTeam[index], teamName: value };
                    setTeams(newTeam);

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
                title: "✅ Team Updated!",
                html: `🎉 Team name updated to <span style="color:#3085d6;">${newName}</span> successfully! 🎉`,
                icon: "success"
            });
        }
    };

    return (
        <>

            <div className="border-x-2 border-b-2 border-theme_black w-full flex justify-center  items-center flex-col  md:pb-10 pt-6 px-4 lg:px-16">
                    <h1 className="mb-6 text-black font-poppins font-semibold  text-center text-3xl">
                        Add Team
                    </h1>
                <form onSubmit={handleSubmit} className="mb-16 flex justify-center items-center   flex-col  md:w-[50%] gap-6 font-poppins">

                    <React.Fragment >
                        <label className="w-full cursor-pointer border p-3">
                            Enter Team
                            <input
                                type="text"
                                className={`w-full cursor-pointer border border-theme_black p-3  placeholder:text-black mt-2 ${errors ? 'border-red-500' : ''}`}
                                placeholder="Enter Team Name"
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
                        Add Team
                    </button>
                </form>


                <div className="p-6 bg-[#FADFA1] mt-10 flex justify-center w-full">
                    <div className=" w-full lg:w-2/3">
                        <h1 className="text-4xl text-center font-bold mb-6 text-black">Teams</h1>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-lg rounded-lg">
                                <thead>
                                    <tr className="bg-[#9fb973] text-white">
                                        <th className="py-md-3 px-md-4  py-1 px-1 rounded-tl-lg" scope="col">No</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1" scope="col">Team</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1 " scope="col">Edit</th>
                                        <th className="py-md-3 px-md-4 py-1 px-1 rounded-tr-lg" scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.length > 0 ? (
                                        teams.map((item, index) => (
                                            <tr key={index} className={` ${index % 2 === 1 ? 'bg-orange-50' : 'bg-white'}`}>
                                                <td className='py-3 px-4   text-lg font-semibold text-gray-800'>
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-4 text-lg    text-gray-800">
                                                    {item?.teamName}
                                                </td>
                                                <td onClick={() => handleEditTeam(item?._id, item?.teamName, index)} className="y-3 px-4 text-lg  text-blue-800">
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

export default AddTeam;
