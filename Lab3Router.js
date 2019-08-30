let express = require('express');
let router = express.Router();


// Database is an array of records
let db = [];


//First record is an object contains the four attributes
let rec = {
    id: 48,
    Name: 'TV',
    Quantity: 3,
    Price: 1102
};


//Insert the first record to the db
db.push(rec);

//listen to homepage requests
router.get('/', function (req, res) {
    res.send('Warehouse Management System');
});

//list all items
router.get('/listAllItems', function (req, res) {
    res.send(generateList());
});

//insert new item
router.get('/newItem/:name/:quantity/:price', function (req, res) {
    console.log(req.params);
    //Generate new ID
    let newID= Math.round(Math.random()*1000);
    //retirieve parameters of the pathname
    let newRec = {
        id: newID,
        Name: req.params.name,
        Quantity: req.params.quantity,
        Price: req.params.price
        
    }
    db.push(newRec);
    res.send(generateList());
});

//delete an item from the DB
router.get('/deleteItem/:del', function (req, res) {
    console.log(req.params);
    deleteItem(req.params.del);
    res.send(generateList());
})

//Send the number to the delete method
function deleteItem(delID) {
    console.log(delID);
    let index;
    //Loop through db to match number
    for (let i = 0; i < db.length; i++) {
        if (delID == db[i].id){
            index = db.indexOf(db[i]);
            console.log(db[i]);
            console.log(index);
            console.log(db);
            
        } else {
            
            return null;
        }
        
    }
    return db.splice(index,1);
}

//generates a string contains the list of items
function generateList() {
    let st = 'ID&nbspName&nbsp#&nbsp&nbsp&nbsp&nbsp$&nbsp&nbsp&nbsp&nbsp&nbsp&nbspCost</br>';
    
    for (let i = 0; i < db.length; i++) {
        //get cost
        let itemCost = db[i].Quantity * db[i].Price;
        var costPrint = itemCost.toString();
        st += db[i].id + ' | ' + db[i].Name + ' | ' + db[i].Quantity +' | ' + db[i].Price + ' | ' + costPrint +'</br>';
    }
    return st;
}


//get warehouse value
router.get('/totalValue', function (req, res) {
    let st = 'Total Warehouse Value  </br>';
    let init = 0;
    for (let i = 0; i < db.length; i++) {
        //get cost for each element
        let itemCost = db[i].Quantity * db[i].Price;
        init += itemCost;
        
    }
    st += init;
    res.send(st);
    
})

//export this router 
module.exports = router;