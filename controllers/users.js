'use-strict'

module.exports = function(_, passport,async, city){
    return{
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.get('/city/:city',this.city);
            router.get('/admin',this.admin);
            router.get('/admin/restro',this.getAdminRestro);
            router.get('/adminArray',this.getadminArray);
            router.get('/city/:city/:restro',this.getRestro);

            router.post('/admin',this.adminPostPage);
            router.post('/adminArray',this.postadminArray);
            router.post('/admin/restro',this.adminrestro);
        },
        indexPage: function(req,res){
            res.render('index', {title: 'HungryBear'});
        }, 
        city:function(req,res){
            var City = req.params.city;
            async.parallel([
                function(callback){
                    city.findOne({'name': City})
                        .exec((err,result)=>{
                            callback(err,result);
                        })
                }
            ],(err,results)=>{
                const result1 = results[0];
                console.log(result1.restro)
                res.render('city', {title: 'HungryBear', data:result1, city: City});
            });
        },
        adminPostPage: function(req,res){
            
            const newcity = new city();
            newcity.name = req.body.name;
            newcity.country = req.body.country;
            newcity.image = req.body.upload;
            console.log(newcity.name);
            newcity.save((err)=>{
                res.render('admin/city');
            })
                
        },
        admin: function(req,res){
            res.render('admin/city')
        },
        adminrestro: function(req,res){

        },
        getAdminRestro:function(req,res){
            res.render('admin/restro')
        },
        getadminArray: function(req,res){
            res.render('admin/cityArray')
        },
        postadminArray: function(req,res){
            
            async.parallel([
                function (callback) {
                    if (req.body.restro) {
                        city.update({
                            "name": req.body.name,
                            $push: {
                                "restro": {
                                    name: req.body.restro,
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
        getRestro: function(req,res){
            res.render('restro',{title: 'HungryBear', restro:req.params.restro});
        }
    }
}
