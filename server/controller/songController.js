const song=require('../model/song');


exports.getSongByQuery=(req,res,next)=>{
    console.log("hello");

    res.status(200).json(song.getByName(req.query.title));
}

exports.getSongs=(req,res,next)=>{
    console.log("helloo");
    res.status(200).json(song.fetchAll());
}
