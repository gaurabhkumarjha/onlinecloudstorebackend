const users = require('../modules/userSchema');
const csv= require("fast-csv");
const fs= require("fs");
const BASE_URL= process.env.BASE_URL


exports.userpost = async (req, res) => { // registerations userpost

  const userdata = new users(req.body);
  try {
    const savedpost = await userdata.save();
    res.status(201);
    res.status(201).json(savedpost); // for postman app
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.userget = async (req, res) => { // get my details userget

  const search = req.query.shearchuserdata || ""
  const page= req.query.page || 1
  const itemperpage= 2

  const query = {

    legalname: { $regex: search, $options: "i" } // For search 
  }
  try {
    
     const skip= (page-1)*itemperpage;
     const count= await users.countDocuments(query);
    



    const userdata = await users.find(query)
         .limit(itemperpage)
         .skip(skip);

       const pagecnt= Math.ceil(count/itemperpage);



    res.status(201).json({
      
         pagination:{
          count,pagecnt
         },
         userdata
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.singleuserview = async (req, res) => { // single View Details 

  const { id } = req.params;
  try {

    const userdata = await users.findOne({ _id: id });
    res.status(201).json(userdata);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.singleuserupdate = async (req, res) => { // user edit

  const { id } = req.params;

  const { legalname, mobilenumber, userid, password, opt, remarks } = req.body;


  try {
    const updateduserdata = await users.findByIdAndUpdate({ _id: id }, {
      legalname, mobilenumber, userid, password, opt, remarks
    });

    const savedpost = await updateduserdata.save();
    res.status(201);
    res.status(201).json(savedpost); // for postman app
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.singleuserdelete = async (req, res) => { // delete

  const { id } = req.params;
  try {

    const userdelete = await users.findByIdAndDelete({ _id: id });
    res.status(201).json(userdelete);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.userexport = async (req, res) => { // Export Data

  
  try {
    
      
    const userdata = await users.find();

    const csvStream= csv.format({headers:true});

    if (!fs.existsSync("public/files/export")){

       if (!fs.existsSync("public/files")){
        fs.mkdirSync("public/files/")
       }

       if (!fs.existsSync("public/files/export")){
        fs.mkdirSync("public/files/export")
       }
    }

     const writeableStream= fs.createWriteStream(
      "public/files/export/users.csv"
     );

     csvStream.pipe(writeableStream);

     writeableStream.on("finish", ()=> {

         res.json({
           CLICKThisLINKForDOWNLOADYourData: `${BASE_URL}/files/export/users.csv`,
         });
     });

      if (userdata.length > 0){

        userdata.map((user)=> {

          csvStream.write({
             Name:user.legalname ? user.legalname : "-",

             MobileNumber:user.mobilenumber ? user.mobilenumber : "-",

             Userid:user.userid ? user.userid : "-",

             Password:user.password ? user.password : "-",

             Months:user.opt ? user.opt : "-",

             Remarks:user.remarks ? user.remarks : "-"
           });
        });
      }


     csvStream.end();
     writeableStream.end();


  } catch (err) {
    res.status(500).json(err);
  }
}