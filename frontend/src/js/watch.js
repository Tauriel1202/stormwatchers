import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";
import axios from "axios";
import { imageToBase64 } from "./functions";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: Cookies.getCookie("username"),
      myImg: Cookies.getCookie("myImg"),
      error: false,
      formOn: false,
      b64: "",
      postsLoaded: false,
      postData: {},
      update: false,
      postClicked: {},
      host: localStorage.getItem("host") || "http://localhost:2024",
      b64: ''
    };
  }

  componentDidMount() {
    axios.post(`${this.state.host}/stormwatch`).then((posts) => {
      this.setState({ postData: posts.data });
    });
  }

  // ✅
  getPosts() {
    let postJson = this.state.postData;

    return Object.keys(postJson).map((onePost) => {
      let ettPost = postJson[onePost];

      return (
        <div className="posts" key={onePost}>
          <div className="postUser">
            <div className="imgDiv">
              <img
                src={`../imgs/profPics/${ettPost.myImg}.webp`}
                alt="user"
                width={100}
                height={100}
              />
            </div>
            <h4>{ettPost.username}</h4>
          </div>
          <div className="postDeets">
            <h3>{ettPost.eventName}</h3>
            <p>{ettPost.loc}</p>
            <p className="postDesc">{ettPost.desc}</p>
            <div className="imgDiv">
              <img
                src={`${ettPost.eventPic}`}
                // src=
                  // "data:image/jpeg;base64,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"
                
                // src="https://cdn.forumcomm.com/dims4/default/e02a5e5/2147483647/strip/true/crop/1055x703+0+110/resize/840x560!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F84%2Fda%2Fffa3058240239da3c5b9f8a15721%2Fnolting-rainbow.jpg"

                alt={ettPost.eventName}
                width={100}
                height={100}
              />
            </div>
          </div>
          {this.state.signedIn && (
            <div className="buttons">
              <button
                className="update"
                onClick={() => {
                  this.setState({
                    formOn: true,
                    update: true,
                    postClicked: ettPost,
                  });
                  // this.setState({ formOn: true });
                }}
              >
                Update
              </button>
              <button
                className="hazard"
                onClick={() => {
                  this.deletePost(ettPost);
                }}
              >
                Delete
              </button>
            </div>
          )}
          {!this.state.signedIn && (
            <div className="buttons">
              <button disabled className="update">
                Update
              </button>
              <button disabled className="delete">
                Delete
              </button>
            </div>
          )}
        </div>
      );
    });
  }

  convertImg() {
    let imgField = document.querySelector(".eventPic").files; //gets the file from the input
    let imagePreview = document.querySelector("#imagePreview");

    if (imgField) {
      let image = imgField[0];
      let url = URL.createObjectURL(image);
      imagePreview.src = url;
      console.log(imageToBase64(url));
      return imageToBase64(url)
      // this.setState({b64: `${imageToBase64(url)}`})
      // console.log('b64', this.state.b64)
      // let im = imgField[0]; //gets the img file itself

      // let reader = new FileReader();

      // reader.onload = function (e){
      //   let b64 = e.target.result; //gets the b64
      //   console.log(b64)
      // }

      // return img;
    }
  }

  //✅
  postStorm() {
    if (this.state.update) {
      let postData = this.state.postClicked;

      return (
        <form className="postForm" method="post">
          <h3>Update your Post</h3>
          <label>
            Weather Event: *
            <input
              type="text"
              name="eventName"
              className="eventName"
              defaultValue={postData.eventName}
              required
            />
          </label>
          <label>
            Location (City, State): *
            <input
              type="text"
              name="loc"
              className="loc"
              defaultValue={postData.loc}
              required
            />
          </label>
          <label>
            Description: *
            <textarea
              type="text"
              name="desc"
              className="desc"
              defaultValue={postData.desc}
              required
            ></textarea>
          </label>
          <label>
            Picture of the Weather Event (optional):
            <input
              type="file"
              name="eventPic"
              className="eventPic"
              onChange={this.convertImg}
            />
          </label>
          <input type="hidden" name="username" value={postData.username} />
          <input type="hidden" name="myImg" value={postData.myImg} />
          <input type="hidden" name="b64" onChange={this.convertImg} />
          <input type="hidden" name="old" value={postData.eventName} />
          <div className="buttons">
            <button
              onClick={(e) => {
                this.addStorm(e);
                this.setState({ formOn: false });
              }}
            >
              Post Event
            </button>
            <button
              className="leave"
              onClick={() => {
                this.setState({ formOn: false, update: false });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form className="postForm" method="post">
          <h3>Report a Weather Event</h3>
          <label>
            Weather Event: *
            <input
              type="text"
              name="eventName"
              className="eventName"
              placeholder="double rainbow"
              required
            />
          </label>
          <label>
            Location (City, State): *
            <input
              type="text"
              name="loc"
              className="loc"
              placeholder="Orlando, Florida"
              required
            />
          </label>
          <label>
            Description: *
            <textarea
              type="text"
              name="desc"
              className="desc"
              placeholder="A double rainbow appeared over Lake Okeechobee after the storm."
              required
            ></textarea>
          </label>
          <label>
            Picture of the Weather Event (optional):
            <input
              type="file"
              name="eventPic"
              className="eventPic"
              onChange={this.convertImg}
              // value={this.state.b64}
            />
            <img id="imagePreview" src="" width={84} height={56} />
          </label>
          <input type="hidden" name="username" value={this.state.signedIn} />
          <input type="hidden" name="myImg" value={this.state.myImg} />
          {/* <input type="hidden" name="b64" id='b64' onChange={this.convertImg} /> */}
          <div className="buttons">
            <button
              onClick={(e) => {
                this.addStorm(e);
              }}
            >
              Post Event
            </button>
            <button
              className="leave"
              onClick={() => {
                this.setState({ formOn: false });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      );
    }
  }

  //✅ //adding and updating
  addStorm(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");
    let desc = document.querySelector("textarea");
    let data = {};

    for (let i of inputs) {
      data[i.getAttribute("name")] = i.value;
    }

    data[desc.getAttribute("name")] = desc.value;

    // update
    if (this.state.update) {
      axios
        .post(`${this.state.host}/stormwatch/updateStorm`, data)
        .then((e) => {
          this.setState({ update: false });
          let a = document.createElement("a");
          a.href = "./stormwatch";
          a.click();
        });
    } else {
      //add
      axios.post(`${this.state.host}/stormwatch/postStorm`, data).then((e) => {
        let a = document.createElement("a");
        a.href = "./stormwatch";
        a.click();
        this.setState({ formOn: false });
      });
    }
  }

  //✅
  deletePost(ettPost) {
    axios
      .post(`${this.state.host}/stormwatch/deletePost`, ettPost)
      .then((e) => {
        let a = document.createElement("a");
        a.href = "./stormwatch";
        a.click();
      });
  }

  //✅
  buttons() {
    if (this.state.signedIn) {
      return (
        <button
          onClick={() => {
            this.setState({ formOn: true });
          }}
        >
          Post a Weather Event!
        </button>
      );
    } else {
      return (
        <span>
          <button disabled>Post a Weather Event!</button>
        </span>
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        <main className="watch">
          <div className="top">
            {!this.state.signedIn && (
              <p className="banner">
                Post, update, and delete actions are turned off. -
                <a href="./account"> Sign in here</a> to enable them.
              </p>
            )}
            <h2>Weather Event Reports</h2>
            {!this.state.formOn && this.buttons()}
          </div>
          {this.state.formOn && this.postStorm()}
          {!this.state.formOn && (
            <div className="stormReports">{this.getPosts()}</div>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default Watch;
