var query = require("./connection");
var google = require("./googleApi");



async function update(){
    const result = await google.updateDailyTrends(query);
    
    return;
}

update();
return;