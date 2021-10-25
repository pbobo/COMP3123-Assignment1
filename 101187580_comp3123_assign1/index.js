// Prendi Bobo | 101187580

// step1 read a userjon file
// step 2 according to the query sring
// read the part of the json file. according to query string

let express = require('express')
let fs = require('fs')
let app = express()
//app.use(logger)


//localhost:8081/users?uid=(number)
app.get("/users", (req, res) => {
      let choice = req.query.uid
      let message = {
        "message": "user not found"
      }
      //console.log("you typed"+choice)
      fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        else {
        let newsdata = JSON.parse(data)
        //console.log(newsdata[choice])
        //res.send(newsdata[choice-1])  
        if(choice <= 10) {
          res.send(newsdata[choice-1])
        } else {
          res.send(message)   
        }
      }  
    })
})

function dynamicSort(property) {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder == -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}

app.get("/users/all", (req,res) => {
  fs.readFile('./users.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      let box = JSON.parse(data)
      box.sort(dynamicSort("username"))
      res.send(box)
      console.log(data)
    }
  })

})

// localhost:8081
let server = app.listen(8081, () => {
  let host = server.address().address
  let port = server.address().port
  console.log("Server running at http://%s:%s", host, port)
})
