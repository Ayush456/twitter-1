const rmq = require('redis-message-queue');
const normalQueue = new rmq.NormalQueue('requestQueue','6379','127.0.0.1');

normalQueue.push("request 1",(error) => {
    console.log(error);
});

normalQueue.push("request 2",(error) => {
    console.log(error);
});


normalQueue.get(10,(error,message) => {
    if(error) console.log(error);
    else {
        console.log(message);
    }
});

