import React, { useEffect, useState } from 'react';
import { getTeamPoint, scoreData } from '../api/apiCall';
import toast, { Toaster } from 'react-hot-toast';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ScoreAd = () => {


  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [teams, setTeams] = useState([]);
  const [afterCount, setAfterCount] = useState(100);
  useEffect(() => {
  async function fetchData() {
    const toastId = toast.loading('Loading...');
    try {
      const response = await getTeamPoint();
      toast.dismiss(toastId);

      if (response?.success) {
        toast.success('Team data loaded successfully!');
        setTeams(response?.data?.sortedResults)
        
        setAfterCount(response?.data?.afterCount);
      } else {
        toast.error(response.message || 'Failed to load team data');
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error.message);
      toast.error('Something went wrong');
    }
  }

  fetchData();
}, []);


  const handlePointChange = (e, index) => {
    const points = parseInt(e.target.value, 10) || 0;

    const updateTeams = [...teams]
    updateTeams[index] = { ...updateTeams[index], point: points }
    setTeams(updateTeams);
    // Clear error when the user corrects the input
    if (errors[index]) {

      const updateerror = [...errors]
      updateerror[index] = ''
      setErrors(updateerror);
    }
  };

  const validateForm = () => {
    const newErrors = [];
    let isValid = true;

    teams.forEach((item, index) => {
      if (!item.point && item.point !== 0) {
        newErrors[index] = 'Points are required';
        isValid = false;
      } else if (formState[index] < 0) {
        newErrors[index] = 'Points cannot be negative';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    toast.loading('Adding scores...');

    const response = await scoreData(teams,afterCount);
    toast.dismiss();

    if (response.message === true) {
      toast.success('Scores added successfully');
      setFormState({}); // Reset form after successful submission
    } else {
      toast.error('Failed to add scores');
    }
  };

  return (
    <>
          
      {teams.length > 0 ? (
        <div className="border-x-2 border-b-2 border-theme_black w-full pb-10 pt-6 px-4 lg:px-16">
          <h1 className="mb-6 text-black font-poppins font-semibold text-center text-3xl">
            Results
          </h1>
    <div className='mb-7'>
             <label className="w-full block bg-yellow-100 cursor-pointer text-xl border p-3">
                 Enter After Count
                  <input
                    type="number" 
                    className={`w-full mt-2 border p-3 placeholder:text-black`}
                    placeholder="Enter after result count"
                    value={afterCount}
                    onChange={(e) => setAfterCount(e.target.value)}
                  />
                   <span className="text-red-500 text-sm">If you are entering the final result, please set the after count to 10001.</span>
                </label>
          </div>
          <form onSubmit={handleSubmit} className="mb-16 grid grid-cols-1  sm:grid-cols-2 gap-6 font-poppins">
            {teams.map((item, index) => (
              <React.Fragment key={item?.team?.teamName}>
                <label className="w-full cursor-pointer border p-3">
                  {item.team?.teamName}
                  <input
                    type="text"
                    className={`w-full cursor-pointer border border-theme_black p-3 placeholder:text-black mt-2 ${errors[index] ? 'border-red-500' : ''}`}
                    placeholder="Enter Point"
                    value={item?.point}
                    onChange={(e) => handlePointChange(e, index)}
                  />
                  {errors[index] && <span className="text-red-500 text-sm">{errors[index]}</span>}
                </label>
              </React.Fragment>
            ))}
            <button
              className="border border-theme_black cursor-pointer bg-gray-900 p-3 text-white font-medium col-span-1 sm:col-span-2"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>) : (


        <div className="flex items-center justify-center h-screen w-screen">
          <div className="w-1/2 h-1/2">
            <DotLottieReact
              src="https://lottie.host/6eaf6b37-b15c-4d93-ab32-71ffab3ab2da/ofCIP0ePup.lottie"
              loop
              autoplay
            />
          </div>
        </div>

      )}

      <Toaster />
    </>
  );
};

export default ScoreAd;
