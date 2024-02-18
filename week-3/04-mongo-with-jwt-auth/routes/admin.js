const { Router } = require("express");
const  { Admin } = require("../db/index")
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Course } = require("../db/index")

let courseId = 1;


const secretKey = "Anurag";

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if username exists
    const result = Admin.findOne({username: username}).exec();

    result.then((op) => {
        if(op){
            res.json({ message: "Username already exists!!" });
        }
        else{
            const newAdmin = new Admin({ username: username, password: password })
            newAdmin.save();
            res.json({ message: 'Admin created successfully' });
        }
    });
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if username exists
    const result = Admin.findOne({username: username}).exec();

    result.then((op) => {
        if(op){
            // res.json({ message: "Username already exists!!" });
            if(op.password == password){
                const tokenPayload = {
                    username: username
                };

                authToken = jwt.sign(tokenPayload, secretKey);

                res.status(200).json({
                    msg: "Success",
                    auth: authToken
                });
                return;
            }
            else{
                res.json({ msg: "Authentication Failed" });
                return;     
            }
        }
        else{
            res.json({ msg: "Authentication Failed" });
            return;
        }
    });
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = new Course({ courseId: courseId,
    title:title, description:description, price: price, imageLink: imageLink})    

    newCourse.save();
    

    res.status(200).json({
        message: 'Course created successfully', courseId: courseId
    });
    courseId += 1;
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

    const getCourses = Course.find({});

    getCourses.then((listOfCourses) =>  {
        let newListOfCourses = listOfCourses.map((element) => {
            let newElement = {};
            newElement["id"] = element["courseId"];
            newElement["title"] = element["title"];
            newElement["description"] = element["description"];
            newElement["price"] = element["price"];
            newElement["imageLink"] = element["imageLink"];

            return newElement;
        })

        res.status(200).json({courses: newListOfCourses});
        
    });

    return;
});

module.exports = router;