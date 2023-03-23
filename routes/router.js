const express= require('express');
const router= new express.Router();
const controller= require('../controller/usercontroller');


router.post("/registration",controller.userpost)
router.get("/getmydetails", controller.userget)
router.get("/details/:id", controller.singleuserview)
router.put("/user/edit/:id", controller.singleuserupdate)
router.delete("/user/delete/:id", controller.singleuserdelete)
router.get("/userexport", controller.userexport)

module.exports= router;