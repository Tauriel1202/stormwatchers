import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";
import axios from "axios";
import { getUrl, imageToBase64 } from "./functions";

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
      host: getUrl(), //localStorage.getItem("host") || "http://localhost:2024",
      b64: "",
      filteredUser: "All Users",
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

    if (this.state.filteredUser === "All Users") {
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
                  src={`${ettPost.b64}`}
                  alt={ettPost.eventName}
                  width={100}
                  height={100}
                />
              </div>
              <p>{ettPost.time}</p>
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
    } else {
      return Object.keys(postJson).map((onePost) => {
        if (postJson[onePost].username === this.state.filteredUser) {
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
                    src={`${ettPost.b64}`}
                    alt={ettPost.eventName}
                    width={100}
                    height={100}
                  />
                </div>
                <p>{ettPost.time}</p>
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
        }
      });
    }
  }

  postFilter() {
    let postJson = this.state.postData;

    let userArr = Object.keys(postJson).map((onePost) => {
      return postJson[onePost].username
    });

    return Array.from(new Set(userArr)).sort().map((e) => {
      return <option key={e}>{e}</option>
    })
  }

  convertImg() {
    let imgField = document.querySelector(".eventPic").files; //gets the file from the input
    let imagePreview = document.querySelector("#imagePreview");

    if (imgField) {
      let image = imgField[0];
      let url = URL.createObjectURL(image);
      imageToBase64(url, (b64) => {
        document.querySelector("#b64").value = b64;
      });
      imagePreview.src = url;
    }
  }

  //✅
  postStorm() {
    let date = new Date();

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
            <img id="imagePreview" src="" width={84} height={56} />
          </label>

          <input type="hidden" name="username" value={postData.username} />
          <input type="hidden" name="myImg" value={postData.myImg} />
          <input type="hidden" name="b64" id="b64" />
          <input type="hidden" name="old" value={postData.eventName} />
          <input type="hidden" name="time" value={date} />
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
            />
            <img id="imagePreview" src="" width={84} height={56} />
          </label>
          <input type="hidden" name="username" value={this.state.signedIn} />
          <input type="hidden" name="myImg" value={this.state.myImg} />
          <input type="hidden" name="b64" id="b64" />
          <input type="hidden" name="time" id="time" value={date} />
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
            {/* banner */}
            {!this.state.signedIn && (
              <p className="banner">
                Post, update, and delete actions are turned off. -
                <a href="./account"> Sign in here</a> to enable them.
              </p>
            )}
            {/* user select menu */}
            {!this.state.formOn && (
              <label className="userFilter">
                Filter posts by user:
                <select
                  onChange={(e) => {
                    this.setState({ filteredUser: e.target.value });
                  }}
                >
                  <option>All Users</option>
                  {this.postFilter()}
                </select>
              </label>
            )}
            {/* page header */}
            <h2>Weather Event Reports</h2>
            {/* post button */}
            {!this.state.formOn && this.buttons()}
          </div>
          {/* displayed posts */}
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
