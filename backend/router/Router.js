const express = require("express");
const router = express.Router();

const multer = require("../util/mutler.js");
const dataController = require("../Controller/getAndPost.js");
const brochureController = require("../Controller/addBrochure.js");
const teamController = require("../Controller/teamController.js");
const categoryController = require("../Controller/categoryController.js");
const itemController = require("../Controller/itemController.js");
const checkProgramStarted = require("../middleware/program.js");
const { saveGalleryImage, getAllImages, deleteGalleryImage, get3Images } = require("../Controller/galleryController.js");
const videoController = require("../Controller/videoController.js");

router.get("/startprogram", dataController.startProgram);
router.get("/checkstatprogram", dataController.checkStartProgram);
router.get("/stopprogram", dataController.stopProgram);
router.get("/resetprogram", dataController.resetProgram);
router.get("/getresult", dataController.getData);
router.post("/imageUpload", multer.templateImagesUpload, dataController.addImage);
router.get("/showImage", dataController.showImage);
router.get("/allresult", dataController.allResult);

router.post("/saveresult", dataController.postData);
router.post("/saveteampoint", dataController.saveTeamPoint);
router.get("/teampoint", dataController.getTeamPoint);
router.post("/addbrochure");

//add brochure
router.put(
  "/addBrochure",
  multer.brochureImageUpload,
  brochureController.addBrochure
);
router.get("/getbrochuse", brochureController.getBrochuse);
router.put("/adddescription", brochureController.addDescription);
router.get("/getdescription", brochureController.getDescription);


//teams
router.post("/addteamname", teamController.addTeam);
router.get("/getteamname", teamController.getTeam);
router.delete("/deleteteam/:teamId", checkProgramStarted,teamController.deleteTeam);
router.put("/editteam",checkProgramStarted, teamController.editTeam);

//category
router.post("/addcategoryname", categoryController.addCategory);
router.delete("/deletecategoryname/:categoryId",checkProgramStarted,categoryController.deletecategory);
router.put("/editcategoryname", categoryController.editCategoryName);
router.get("/getcategoryname", categoryController.getCategory);

//item
router.post("/additemname", itemController.addItem);
router.get("/getitemname/:categoryId", itemController.getItem);
router.put("/edititemname", itemController.editItemName);
router.delete("/deleteitemname/:itemId",checkProgramStarted, itemController.deleteItem);

//gallery
router.post("/upload-gallery", multer.galleryImagesUpload, saveGalleryImage);
router.get("/get-gallery", getAllImages);
router.get("/get3-gallery", get3Images);
router.delete("/delete-gallery/:id", deleteGalleryImage);

//videos
router.get('/getvideo',videoController.getYoutube)
router.post('/addvideo',videoController.addYoutube)
router.delete('/delete-videolink/:id',videoController.deleteYoutube)
router.get('/get3video',videoController.get4Youtube)


//live


router.get("/getlivelink", videoController.getLiveStreams);
router.post("/savelivelink", videoController.updateLiveStreams);


//feature


// ✅ GET all features
router.get("/get-feature", dataController.getFeature);
router.get("/reset-feature", dataController.resetFeature);

// ✅ PATCH: Toggle feature (enable/disable)
router.patch("/feature-update",dataController.featureUpdate );


module.exports = router;