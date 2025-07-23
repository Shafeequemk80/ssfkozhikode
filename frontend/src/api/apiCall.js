import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
  
async function startProgram() {
  const response = await axios.get(
    `${baseUrl}/startprogram`
  );
  
  return response.data;
}
async function checkStartProgram() {
  const response = await axios.get(
    `${baseUrl}/checkstatprogram`
  );
  
  return response.data;
}

async function resetProgram() {
  const response = await axios.get(
    `${baseUrl}/resetprogram`
  );
  
  return response.data;
}

async function checkforResult() {
  const response = await axios.get(
    `${baseUrl}/checkstatprogram`
  );
  
  return response.data;
}
async function stopProgram() {
  const response = await axios.get(
    `${baseUrl}/stopprogram`
  );
  
  return response.data;
}
async function getDataServer(item, category) {
  const response = await axios.get(
    `${baseUrl}/getresult/?item=${item}&category=${category}`
  );
 
  return response.data;
}
async function getResultImage() {
  const response = await axios.get(
    `${baseUrl}/showImage`
  );
  
  return response.data;
}

async function postDataServer(postData) {
  try {

    const response = await axios.post(`${baseUrl}/saveresult`, postData);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

const options = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

async function ImageUploadServer(formData) {
  try {
    console.log(formData);
    const response = await axios.post(
      `${baseUrl}/imageUpload`,
      formData,
      options
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getallresult() {
  const response = await axios.get(`${baseUrl}/allresult`);

  return response.data;
}
async function getTeamPoint() {
  const response = await axios.get(`${baseUrl}/teampoint`);

  return response.data;
}

async function scoreData(formData,afterCount) {
  try {
    const response = await axios.post(`${baseUrl}/saveteampoint`, {formData,afterCount});

    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // No response was received after the request was made
      console.error("No response received:", error.request);
    } else {
      // Other errors during the request setup
      console.error("Error setting up request:", error.message);
    }
  }
}

async function addDescription(description) {
  const response = await axios.put(`${baseUrl}/adddescription`, {
    description,
  });
  return response.data;
}
async function addTitle(title) {
  const response = await axios.put(`${baseUrl}/addtitle`, {
    title,
  });
  return response.data;
}
async function getDescription() {
  const response = await axios.get(`${baseUrl}/getdescription`);
  return response.data;
}

async function getBrochure() {
  const response = await axios.get(`${baseUrl}/getbrochuse`);
  return response.data;
}
async function addBrochure(formData) {
  const response = await axios.put(`${baseUrl}/addbrochure`, formData);
  return response.data;
}

async function addTeamName(teamName) {
  const response = await axios.post(`${baseUrl}/addteamname`, { teamName });
  return response.data;
}
async function getTeam() {
  const response = await axios.get(`${baseUrl}/getteamname`);
  return response.data;
}

async function deleteTeam(teamId) {
  const response = await axios.delete(`${baseUrl}/deleteteam/${teamId}`);
  return response.data;
}
async function editTeam(teamId, teamName) {
  const response = await axios.put(`${baseUrl}/editteam`, { teamId, teamName });
  return response.data;
}
async function addToGallery(formData) {
  const response =await axios.post(`${baseUrl}/upload-gallery`,formData);
  return response.data;
}
async function getGallery() {
  const response = await axios.get(`${baseUrl}/get-gallery`);
  return response.data;
}
async function get3fromGallery() {
  const response = await axios.get(`${baseUrl}/get3-gallery`);
  return response.data;
}

 async function deleteGalleryImage(id) {
  const response = await axios.delete(`${baseUrl}/delete-gallery/${id}`);
  return response.data;
}
async function getYoutubeLink() {
  const response = await axios.get(`${baseUrl}/getvideo`);
  return response.data;
}
async function addYoutubeLink(url) {
  const response = await axios.post(`${baseUrl}/addvideo`,url);
  return response.data;
}

async function deleteYoutubeLink(id) {
  const response = await axios.delete(`${baseUrl}/delete-videolink/${id}`);
  return response.data;
}


async function get3YoutubeLink() {
  const response = await axios.get(`${baseUrl}/get3video`);
  return response.data;
}

async function saveLiveLink(lives) {
  console.log(lives,'sdfasd');
  const response = await axios.post(`${baseUrl}/savelivelink`,lives);
  return response.data;
}
async function getlivelink() {
  const response = await axios.get(`${baseUrl}/getlivelink`);
  return response.data;
}
async function getFeatures() {
  const response = await axios.get(`${baseUrl}/get-feature`);
  return response.data;
}
async function resetFeature() {
  const response = await axios.get(`${baseUrl}/reset-feature`);
  return response.data;
}
async function setfeature(data) {
  const response = await axios.patch(`${baseUrl}/feature-update`,data);
  return response.data;
}

export {
  baseUrl,
  startProgram,
  checkforResult,
  checkStartProgram,
  resetProgram,
  stopProgram,
  postDataServer,
  getDataServer,
  getResultImage,
  ImageUploadServer,
  getallresult,
  getTeamPoint,
  scoreData,
  addDescription,
  addTitle,
  getDescription,
  getBrochure,
  addBrochure,
  addTeamName,
  getTeam,
  deleteTeam,
  editTeam,
  addToGallery,
  getGallery,
  deleteGalleryImage,
  get3fromGallery,
  getYoutubeLink,
  addYoutubeLink,
  deleteYoutubeLink,
  get3YoutubeLink,
  saveLiveLink,
  getlivelink,
  getFeatures,
  resetFeature,
  setfeature
};  
