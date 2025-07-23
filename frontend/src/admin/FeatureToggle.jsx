import { useEffect, useState } from "react";
import axios from "axios";
import { FiRefreshCw } from "react-icons/fi";
import { getFeatures,resetFeature, setfeature } from "../api/apiCall";
import toast, { Toaster } from "react-hot-toast";

function FeatureToggle() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);


// 🔁 Fetch all features
useEffect(()=>{
  async function fetchData(){
setLoading(true);
  try {
    const res = await toast.promise(
     getFeatures(),
      {
        loading: "Loading features...",
        success: "Features loaded ✅",
        error: "Failed to load features ❌",
      }
    );
    console.log();
    
    setFeatures(res);
  } catch (error) {
    console.error("Get features failed:", error);
  } finally {
    setLoading(false);
  }

  }
  fetchData()
},[])
  

// 🔄 Update single feature
const updateFeature = async (name, current) => {
  try {
    const res = await toast.promise(
      setfeature( {name, enabled: !current }),
      {
        loading: "Updating feature...",
        success: "Feature updated ✅",
        error: "Update failed ❌",
      }
    );
    setFeatures((prev) =>
      prev.map((f) => (f.name === name ? res : f))
    );
  } catch (error) {
    console.error("Update feature failed:", error);
  }
};

// ♻️ Reset all features
const resetFeatures = async () => {
  try {
    const res = await toast.promise(
      resetFeature(),
      {
        loading: "Resetting features...",
        success: "All features reset 🔄",
        error: "Reset failed ❌",
      }
    );
    setFeatures(res.features);
  } catch (error) {
    console.error("Reset features failed:", error);
  }
};



  return (
  <>
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">🛠️ Feature Control Panel</h2>
      <button
        onClick={resetFeatures}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
        <FiRefreshCw className="text-lg" />
        Reset
      </button>
    </div>

    {loading ? (
      <p className="text-center text-gray-500">Loading features...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex justify-between items-center px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            <span className="capitalize text-base font-medium text-gray-800">
              {feature.name}
            </span>
            <button
              onClick={() => updateFeature(feature.name, feature.enabled)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
                feature.enabled
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              {feature.enabled ? "Disable" : "Enable"}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  <Toaster />
</>

  );
}

export default FeatureToggle;
