const user=require('../model/user');



exports.getByUserName=(req,res,next)=>{

    res.status(200).json(user.getByUserName(req.query.username,req.query.password));
}
exports.getByUserNameTocken=(req,res,next)=>{

    res.status(200).json(user.getByUserNameTocken(req.query.username,req.query.password));
}

exports.validateUserTocken=(req,res,next)=>{
    console.log("hhhh");

    res.status(200).json(user.validateUserTocken(req.params.userName,req.params.tockenText));
}



exports.update=(req,res,next)=>{
    console.log("update");
    const userBody=req.body;
    //console.log(req.body);
    const newUser=new user(userBody.id, userBody.username,userBody.password,userBody.tokenCreatedDate,userBody.tokentext).update();
    res.status(201).json(newUser);
}
