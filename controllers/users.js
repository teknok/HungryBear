'use-strict'

module.exports = function(_, passport,async, city, restro){
    return{
        SetRouting: function(router){
            router.get('/',this.indexPage);
            router.get('/city/:city',this.city);
            router.get('/city/:city/:restro',this.getRestro);
            router.get('/city/:city/:restro/:SFBUID',this.display);
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
        getRestro: function(req,res){
            async.parallel([
                function(callback){
                    restro.findOne({'username': req.params.restro})
                        .exec((err,result)=>{
                            callback(err,result);
                        })
                }
            ],(err,results)=>{
                const result1 = results[0];
                res.render('restro',{title: 'HungryBear', restro:req.params.restro, data: result1});            
            });
        },
        display: function(req,res){
            res.render('modelDisplay', {title: 'HungerBolt', restro:req.params.restro, SFBUID: req.params.SFBUID});
        }
    }
}