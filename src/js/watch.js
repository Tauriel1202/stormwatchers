import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";
import axios from "axios";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: Cookies.getCookie("username"),
      myImg: Cookies.getCookie("myImg"),
      error: false,
      formOn: false,
    };
  }

  displayPosts() {
    axios.post("http://localhost:2024/stormwatch").then((posts) => {
      console.log(posts.data);

      for (let i = 0; i < posts.data.length; i++) {
        console.log(posts.data[i].username);
        let ettPost = posts.data[i];

        return (
          <div className="posts">
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
              <p className="postDesc">
                {ettPost.desc}
              </p>
              <div className="imgDiv">
                <img
                  src={`${ettPost.eventPic}`}
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
                    this.setState({ formOn: true });
                  }}
                >
                  Update
                </button>
                <button className="hazard">Delete</button>
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

  postStorm() {
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
          <input type="file" name="eventPic" className="eventPic" />
        </label>
        <input type="hidden" name="username" value={this.state.signedIn} />
        <input type="hidden" name="myImg" value={this.state.myImg} />
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
              this.setState({ formOn: false });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  addStorm(e) {
    e.preventDefault();
    let inputs = document.querySelectorAll("input");
    let desc = document.querySelector("textarea");
    let data = {};

    for (let i of inputs) {
      data[i.getAttribute("name")] = i.value;
    }

    data[desc.getAttribute("name")] = desc.value;

    axios.post(`http://localhost:2024/stormwatch/postStorm`, data).then((e) => {
      console.log(e);
    });
  }

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
          <button
            disabled
            // onClick={() => {
            //   this.setState({ error: true });
            // }}
          >
            Post a Weather Event!
          </button>
          {/* {this.state.error && (
            <p>
              Only signed-in users can post events.
              <a href="./account">Log in here!</a>
            </p>
          )} */}
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
            <div className="stormReports">{this.displayPosts()}</div>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default Watch;
