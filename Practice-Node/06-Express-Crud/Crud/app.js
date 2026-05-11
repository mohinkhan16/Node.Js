import express from "express"
import httpError from "./middelWare/httpError.js"

const app=express()

app.use(express.json())

const StudentList=[
    {
        id:1,
        name:"Mohin",
        Course:"PGDCA"
    },{
        id:2,
        name:"Dev",
        Course:"Msc"
    }
]

app.get("/",(req,res,next)=>{
    res.send("hello from server")
})

app.get("StudentList",(res,req,next)=>{
    if(StudentList.length===0){
        return res.status(200).json({
            message:"Student not found"
        })
    }
    res.status(200).json({message:"StudentList",StudentList})
})

app.get("/StudentList/:id",(req,res,next)=>{
    const id = Number(req.params.id);

    const student =student.find((s)=>s.id===id);


    if(!student)
    {
        return res
        .status(400)
        .json({success:true,message:" NO student Found"})
    }
    res.status(200).json({message:"Student found",success:true,student})
});

//create

app.post("/addStudent",(req,res,next)=>{
    const {name,study}=req.body;


    if(!name || !study){
        return next(new httpError("Student or Course are requesried",400));
    }

    const newStudent={
        id:new Date().getTime(),
        student,Course
    };

    StudentList.push(newStudent);

    res.status(201)
    .json({success:true,message:"New Student added successfully"})
});


//update
app.patch("/updateStudent/:id",(req,res,next)=>{
    const id=Number(req.params.id);

    const StudentData=StudentList.find((s)=>s.id===id);

if(!StudentData){
    return next(new httpError("student and course not found"),404);
}

const {study,Course}=req.body;

if(study){
    StudentData.student=student;
}
if(Course){
    StudentData.Course=Course;
}

if(!study||!Course){
    return next(new httpError("Student and Course data is requried"),400)
}

res.status(200).json({
    success:true,
    message:"StudentData updated succesfully",
    stdentData,
});
})

app.delete("/StudentList/:id",(req,res,next)=>{
    const id=Number(req.params.id)

    const index=StudentList.findIndex((s)=>s.id===id)

    if(index === -1){
        return next(new httpError("requested route not found",404))
    }

    StudentList.splice(index,1)

    res.status(200).json({
        success:true,
        message:"student data deleted successfully"
    })
})

app.use((req,res,next)=>{
    return next(new httpError("request route not found"),404);
})

app.use((error,req,res,next)=>{
    if(req.headerSent){
        return next(error)
    }
    res.status(error.statusCode || 500).json({
        message:error.message ||"something went wrong"
    })
})

const port =5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log(`surver running on port ${port}`);
})