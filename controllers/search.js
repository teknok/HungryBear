'use-strict'

module.exports = function (_, passport, async, city, restro) {
    return {
        SetRouting: function (router) {
            router.get('/results', this.getResults);
            router.post('/results', this.postResults)
        },
        getResults: function (req, res) {
            res.redirect('/');
        },
        postResults: function (req, res) {
            const regex = new RegExp((req.body.country), 'gi');
            console.log(regex);
            console.log(req.body.country);

            async.parallel([
                function (callback) {
                    restro.find({ menu: {$elemMatch: { name: 'a' } } }, (err, result) => {
                        callback(err, result);
                        console.log(result);
                    });
                }
            ], (err, results) => {
                const res1 = results[0];
                console.log(results);
                const dataChunk = [];
                const chunkSize = 3;
                for (let i = 0; i < res1.length; i += chunkSize) {
                    dataChunk.push(res1.slice(i, i + chunkSize));
                }
                console.log(res1)
                res.render('index', { title: 'HungryBear', data: res1, city: regex });
            });
        }
    }
}