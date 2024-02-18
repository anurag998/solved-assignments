const { Router } = require("express");
const  { User } = require("../db/index")
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db/index");
const jwt = require("jsonwebtoken");

const secretKey = "Anurag";


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    // Check if username exists
    result = User.findOne({username: username}).exec();

    result.then((op) => {
        if(op){
            res.json({ message: "Username already exists!!" });
        }
        else{
            const newUser = new User({ username: username, password: password })
            newUser.save();
            res.json({ message: 'User created successfully' });
        }
    });
});

router.post('/signin', (req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if username exists
    const result = User.findOne({username: username}).exec();

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

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const courseIdToPurchase = req.params.courseId;
    // console.log(typeof courseIdToPurchase);
    const username = req.headers.username;

    const listOfCourses = await Course.find({}).exec();

    let coursePresent = false;

    for(course of listOfCourses){
        if(course["courseId"] == courseIdToPurchase){
            coursePresent = true;
            break;
        }
    }

    if(coursePresent === false){
        res.send("Wrong Course id! Can't purchase");
        return;
    }

    const purchasingUser = User.findOne({username: username}).exec();

    purchasingUser.then(async (op) => {
        // console.log(typeof op);
        if(op){
            if(op.coursesPurchased.includes(courseIdToPurchase)){
                res.send("You have already purchased this course id! Can't purchase");
                return;
            }

            op.coursesPurchased.push(courseIdToPurchase);
            await op.save();
            
            res.status(200).json({message: "Course purchased successfully"});
        }
        else{
            res.status(500).json({message: "Sorry! We have an internal server error"});
        }
    });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    console.log("Reached");
    const username = res.locals.username;

    const purchasingUser = await User.findOne({username: username}).exec();

    const listOfCourses = purchasingUser.coursesPurchased;
    console.log(listOfCourses);
    
    coursedOfCurrentUser = []

    for(course of listOfCourses){
        const courseId = Number(course);
        const currCourse = await Course.findOne({courseId: courseId});
        coursedOfCurrentUser.push(currCourse);
    }

    const rVal = coursedOfCurrentUser.map((course => {
        newCourse = {};
        newCourse["id"] = course["courseId"];
        newCourse["title"] = course["title"];
        newCourse["description"] = course["description"];
        newCourse["price"] = course["price"];
        newCourse["imageLink"] = course["imageLink"];

        return newCourse;
    }))
    
    res.status(200).send({purchasedCourses: rVal});
});

module.exports = router