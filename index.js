const express = require('express');
const path = require("path")
const app = express();
const math = require("./math")
let i = 0
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));


const { MongoClient } = require('mongodb');
const { rmSync } = require('fs');
const client = new MongoClient('mongodb://localhost:27017');



const logMiddleware = (req, res, next) => {
    console.log(req.method, req.path);
    next();
}
  
app.get('/user/:id',logMiddleware, (req, res) => {
// :idをreq.params.idとして受け取る
res.status(200).send(req.params.id);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});


async function main() {
  // サーバーのlisten前に接続する
  await client.connect();//awaitで先にデータベースに接続した後に、サーバーを立ち上げる

  const db = client.db("my-app");

  app.get('/', logMiddleware, async (req, res) => {

    const users = await db.collection('user').find().toArray();
    const names = users.map((user) => { 
      return user.name 
    });

    res.render(path.resolve(__dirname,'views/index.ejs'),{users:names})

  })

  
  app.post('/api/user', express.json(), async (req, res) => {
    const name = req.body.name;
    if (!name) {
      res.status(400).send('Bad Request');
      return;
    }
    //i=math.ind_up(i)

    await db.collection('user').insertOne({ name: name });
    res.status(200).send('Created');
  });

  app.delete("/api/user",express.json(),async(req,res)=>{
    const dlname = req.body.name;
    if (!dlname) {
        res.status(400).send('Bad Request');
        return ;
    }
    //i=math.ind_down(i)
    await db.collection("user").deleteOne({ name: dlname });
    res.status(200).send('Created');
  });

  // ポート: 3000でサーバーを起動
  app.listen(3000, () => {
  // サーバー起動後に呼び出されるCallback
    console.log('start listening');
  });
};
main()
