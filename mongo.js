const { MongoClient, ObjectId } = require("mongodb");
const MongoConnection = process.env.MONGO;

const client = new MongoClient(MongoConnection);
const adb = client.db("stormwatchersKids").collection("accounts");
const wdb = client.db("stormwatchersKids").collection("weatherReports");

async function getAccount(req, res) {
  await adb.findOne(req.body).then((e) => {
    res.status(200).send(e);
  });
}

async function getPosts(req, res) {
  await wdb
    .find()
    .toArray()
    .then((posts) => {
      res.status(200).send(posts);
    });
}

async function postStorm(req, res) {
  await wdb
    .insertOne({
      username: req.body.username,
      myImg: req.body.myImg,
      eventName: req.body.eventName,
      loc: req.body.loc,
      desc: req.body.desc,
      eventPic: req.body.eventPic,
      b64: req.body.b64
    })
    .then((e) => {
      res.status(201).send(e);
    });
}

//✅
async function checkAccount(username, email) {
  const user = await adb.findOne({ username: username });
  const e = await adb.findOne({ email: email });

  if (user != null || e != null) {
    return true;
  }
  return false;
}

//✅
async function createAccount(req, res) {
  if (await checkAccount(req.body.username, req.body.email)) {
    res.send("username or email exists");
  } else {
    await adb
      .insertOne({
        username: req.body.username,
        pwd: req.body.pwd,
        email: req.body.email,
        profPic: req.body.profPic,
      })
      .then((user) => {
        res.status(201).send("insert works!");
      });
  }
}

//✅
async function login(req, res) {
  let user = await adb.findOne({
    username: req.body.username,
    pwd: req.body.pwd,
  });

  if (user === null) {
    res.send("username or password incorrect");
  } else {
    res.status(200).send("login successful");
  }
}

//✅
async function updateAccount(req, res) {
  if (await checkAccount(req.body.username, req.body.email)) {
    res.send("username or email exists");
  } else if (!(await checkAccount(req.body.oldName))) {
    res.send("username does not match");
  } else {
    await adb
      .updateOne(
        {
          username: req.body.oldName,
        },
        {
          $set: {
            username: req.body.username,
            pwd: req.body.pwd,
            email: req.body.email,
            profPic: req.body.profPic,
          },
        }
      )
      .then((user) => {
        res.status(203).send("update successful!");
      });
  }
}

//✅
async function updateImg(req, res) {
  await adb
    .updateOne(
      {
        profPic: req.body.oldPic,
      },
      {
        $set: {
          profPic: req.body.profPic,
        },
      }
    )
    .then((e) => {
      res.status(200).send("img update successful");
    });
}

async function updateStorm(req, res) {
  await wdb
    .findOneAndUpdate(
      { eventName: req.body.old,

       },
      {
        $set: {
          eventName: req.body.eventName,
          loc: req.body.loc,
          eventPic: req.body.eventPic,
          username: req.body.username,
          myImg: req.body.myImg,
          b64: req.body.b64,
          desc: req.body.desc,
        },
      }
    )
    .then((post) => {
      res.status(203).send("update successful!");
    });
}

//✅
async function deleteAccount(req, res) {
  await adb.deleteOne(req.body).then(() => {
    res.status(204).send("user deleted!");
  });
}

async function deletePost(req, res) {
  await wdb
    .findOneAndDelete({
      username: req.body.username,
      myImg: req.body.myImg,
      eventName: req.body.eventName,
      loc: req.body.loc,
      desc: req.body.desc,
      eventPic: req.body.eventPic,
    })
    .then((e) => {
      res.status(204).send("post deleted!");
    });
}

module.exports = {
  getAccount,
  getPosts,
  createAccount,
  postStorm,
  login,
  updateAccount,
  updateStorm,
  updateImg,
  deleteAccount,
  deletePost,
};
