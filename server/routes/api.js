const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const User = require('../models/user');
const YouTube = require('youtube-node');

const db = "mongodb://Ravaka:ravaka@ds012678.mlab.com:12678/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error "+err);
    }
});

router.get('/videos', function(req, res){
    console.log('get request all videos');
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log("Error videos");
        }else{
            res.json(videos);
        }
    });
});

router.get('/videos/:id', function(req, res){
    console.log('get request single video');
    Video.findById(req.params.id)
    .exec(function(err, video){
        if(err){
            console.log("Error video");
        }else{
            res.json(video);
        }
    });
});

router.post('/login', function(req, res){
    console.log('login.......');
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        email: email,
        password: password
    });
    User.findOne({email: email, password: password}, function(err, user){
        if(err){
            console.log('Error saving user');
        }
        if(user){
            res.json('success');
        }
        else{
            res.json('error');
        }
    });
});

router.post('/users', function(req, res){
    console.log('Post a user');
    var email = req.body.email;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var password = req.body.password;

    var compteur = 0;

    var newUser = new User({
        lastname: lastname,
        firstname: firstname,
        email: email,
        password: password
    });

    if( email == '' || lastname == '' || email == '' || password == ''){
        compteur = compteur + 1;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email_validate = re.test(String(email).toLowerCase());
    if(email_validate == false){
        compteur = compteur + 1;
    }

    User.findOne({email: email}, function(err, user){
        if(user){
            res.json('email_existant');
        }
        else{
            if(compteur == 0){
                newUser.save(function(err, insertUser){
                    if(err){
                        console.log('Error saving user');
                    }else{
                        res.json(insertUser);
                    }
                });
                //res.json('success');
            }
            else{
                res.json('error_invalide');
            }
            
        }
    });
});

router.post('/videos', function(req, res){
    console.log('Post a video');
    var newVideo = new Video({
        title: "Nouveau playlist",
        url: "",
        description: ""
    });
    
    newVideo.save(function(err, insertVideo){
        if(err){
            console.log('Error saving video');
        }else{
            res.json(insertVideo);
        }
    });
});

router.post('/find_video', function(req, res){
    console.log('find a video');
    var title = req.body.title;
    var newVideo = new Video({
        title: title
    });

    var regex_title = new RegExp(title, "i");

    Video.find({title: regex_title}, function(err, video){
        if(err){
            console.log("Error video");
        }else{
            res.json(video);
        }
    });
});

router.post('/find_video_youtube', function(req, res){
    var youTube = new YouTube();
	youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
	youTube.search(req.body.title, 10, function(error, result) {
    if (error) {
        console.log(error);
    }else{
        var jsonData = JSON.parse(JSON.stringify(result, null, 2));
        console.log(jsonData);
        var videolist=[];
        for(var i=0;i<jsonData.items.length; i++){
            var newVideo = new Video();
            newVideo.title = jsonData.items[i].snippet.title;
            newVideo.url="https://www.youtube.com/embed/"+jsonData.items[i].id.videoId;
            newVideo.img = jsonData.items[i].snippet.thumbnails.default.url;
            newVideo.id = jsonData.items[i].id.videoId;
            videolist.push(newVideo);
        }
        res.status(200).json(videolist);
    }
    });
});

router.post('/update', function(req, res){
    console.log('Update a video');
    console.log('id '+req.body._id);
    console.log('title '+req.body.title);
    console.log('url '+req.body.url);
    Video.update({ _id : new mongodb.ObjectId(req.body._id)}, {$set:{title : req.body.title, url : req.body.url}}, function(err, result){
            if(err){
            console.log("Error video");
        }
    });
    /*Video.findByIdAndUpdate(req.params._id,{
        $set : {title: req.body.title, url: req.body.url}
    },
    {
        new: true
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error updating video");
        }else{
            res.json(updatedVideo)
        }
    }
    )*/
});

router.delete('/video/:id', function (req, res){
    console.log('deleting a video');
    Video.finByIdAndRemove(req.params.id, function(err, deletedVideo){
        if(err){
            res.send("Error deleting video");
        }else{
            res.json(deletedVideo)
        }
    })
});

module.exports = router;