const playList = require('../model/musicPlayList');


exports.save = (req, res, next) => {
    const pl = req.body;
    console.log('save'+pl.songs);
//console.log("body"+pl);
    const newPlayList = new playList(pl.userId, pl.playListId, pl.songs).save();
    res.status(201).json(newPlayList);



}





exports.getPlayListByUserId = (req, res, next) => {
   // console.log('hibokid' + req.params.userId);

    res.status(200).json(playList.getByUserId(req.params.userId));
}

exports.getByUserIdSongId = (req, res, next) => {
  

   res.status(200).json(playList.getByUserIdSongId(req.params.userId,req.params.songId));
}

exports.getPlayLists = (req, res, next) => {
  //  console.log("helloo");
    res.status(200).json(playList.fetchAll());
}

exports.delete = (req, res, next) => {
  //  console.log("delete"+req.params.userId, req.params.songId);
    res.status(200).json(playList.delete(req.params.userId, req.params.songId));
}