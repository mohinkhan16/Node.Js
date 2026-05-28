import multer from "multer";

import fs from "fs";
import { error } from "console";

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        let foldername="uploads/"


        if(file.fieldname === "EventPoster"){
            foldername +="EventPoster"
        }else if(file.fieldname === "EventBanner"){
            foldername +="EventBanner"
        }else if(file.fieldname ==="EventSpeaker"){
            foldername += "EventSpeaker"
        }else{
            foldername+="other";
        }


        fs.mkdirSync(foldername,{recursive:true})

        cb(null,foldername);

    },
    filename:(req,res,cb)=>{
        const UniqueId=`${file.originalname}-${Date.now()}-${file.fieldname}`;

        cb(null,UniqueId)
    }
})


const filedFilter= (req,res,cb)=>{


    const Allowed=[
        "images/png",
        "images/jpg",
        "images/jpeg",
        "application/pdf",
    ]

    if(Allowed.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new error("only jpg,jpeg,and png file are required",400),false)
    }
}

const upload = multer({

    storage,
    fileFilter,
    limits:{fileSize:20*1024*1024}
})

export default upload;