const cron = require('cron');
const https = require('https');

//'* */1 * * * *'  //every seconds
//'*/1 * * * *'  //every minutes
//'*/14 * * * *'  //every minutes
const url = "https://www.google.ru";
const job = new cron.CronJob('*/1 * * * *', function(){
    console.log('not sleep');

    https
        .get("https://www.google.ru",(res)=>{
            if(res.statusCode === 200) {
                console.log('ok :)');
            }else{
                console.error('failed :(');
            }
        })
        .on('error',(err)=>{
            console.error('error');
        });

    //const url = "https://www.google.ru";
    //const url = "https://ru.wikipedia.org/wiki/Список_серий_аниме_One_Piece";
    /*https
        .get(url,(res)=>{
            let data = '';
            res.on('data',(chank) => {
                data += chank;
            });
            res.on('end',() => {
                console.log(data);
            });
        })
        .on('error',(err)=>{
            console.log('error: ' + err.message);
        });*/
});

module.exports = job;