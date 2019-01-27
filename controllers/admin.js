'use-strict'
module.exports = function(_, passport, async, city, restro){
    return{
        SetRouting: function(router){
            router.get('/admin',this.admin);
            router.get('/admin/restro',this.getAdminRestro);
            router.get('/adminArray',this.getadminArray);
            router.get('/restroArray', this.getrestroArray);

            router.post('/admin',this.adminPostPage);
            router.post('/adminArray',this.postadminArray);
            router.post('/admin/restro',this.adminrestro);
            router.post('/restroArray', this.postrestroArray);
        },
        adminPostPage: function(req,res){
            
            const newcity = new city();
            newcity.name = req.body.name;
            newcity.country = req.body.country;
            newcity.image = req.body.upload;
            console.log(newcity.name);
            newcity.save();
            res.render('admin/city');
                
        },
        admin: function(req,res){
            res.render('admin/city')
        },
        adminrestro: function(req,res){
            const newrestro = new restro();
            newrestro.username = req.body.username;
            newrestro.name = req.body.name;
            newrestro.city = req.body.city;
            newrestro.state = req.body.state;
            newrestro.country = req.body.country;
            newrestro.image = req.body.upload;

            console.log(newrestro.username);
            newrestro.save((err)=>{
                res.render('admin/restro');
            })
        },
        getAdminRestro:function(req,res){
            res.render('admin/restro')
        },
        getadminArray: function(req,res){
            res.render('admin/cityArray')
        },
        getrestroArray: function(req,res){
            res.render('admin/restroArray')
        },
        postadminArray: function(req,res){
            
            async.parallel([
                function (callback) {
                    if (req.body.restro) {
                        city.update({
                            "name": req.body.name,
                            $push: {
                                "restro": {
                                    name: req.body.restroname,
                                    username: req.body.restro,
                                    image: req.body.restroImage
                                }
                            }
                        }, (err, count) => {
                            callback(err, count);
                        })
                    }
                }
            ], (err, results) => {
                res.render('admin/cityArray');
            })

        },
        postrestroArray: function(req,res){
            
            async.parallel([
                function (callback) {
                    if (req.body.restro) {
                        restro.update({
                            "username": req.body.restro,
                            $push: {
                                "menu": {
                                    name: req.body.name,
                                    type: req.body.type,
                                    price: req.body.price,
                                    image: req.body.image,
                                    SFBUID: req.body.SFBUID,
                                }
                            }
                        }, (err, count) => {
                            callback(err, count);
                        })
                    }
                }
            ], (err, results) => {
                res.render('admin/restroArray');
            })
        }
    }
}