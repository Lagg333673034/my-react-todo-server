const cron = require('cron');

const job = new cron.CronJob('*/14 * * * *', function(){console.log('not sleep')});
//'* */1 * * * *'  //every seconds
//'*/1 * * * *'  //every minutes
//'*/14 * * * *'  //every minutes

module.exports = job;