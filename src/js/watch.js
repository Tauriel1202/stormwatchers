import React from "react";
import Header from "./header";
import Footer from "./footer";
import Cookies from "./cookie";

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: Cookies.getCookie("username"),
      error: false,
      formOn: false,
    };
  }

  getPosts() {
    return (
      <div className="posts">
        <div className="postUser">
          <div className="imgDiv">
            <img
              src="../imgs/profPics/logoOfficial_small.webp"
              alt="user"
              width={100}
              height={100}
            />
          </div>
          <h4>{this.state.signedIn}</h4>
        </div>
        <div className="postDeets">
          <h3>Rainbow</h3>
          <p>(Milwaukee, Minnesota)</p>
          <p className="postDesc">
            A double rainbow over Blue Lake after a rainstorm.
          </p>
          <div className="imgDiv">
            <img
              src="https://cdn.forumcomm.com/dims4/default/e02a5e5/2147483647/strip/true/crop/1055x703+0+110/resize/840x560!/quality/90/?url=https%3A%2F%2Fforum-communications-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2F84%2Fda%2Fffa3058240239da3c5b9f8a15721%2Fnolting-rainbow.jpg"
              alt={"weather type"}
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => {}}>Update</button>
          <button>Delete</button>
        </div>
      </div>
    );
  }

  postStorm() {
    return (
      <form method="post" className="postForm">
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
        <div className="buttons">
          <button
            onClick={() => {
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
            onClick={() => {
              this.setState({ error: true });
            }}
          >
            Post a Weather Event!
          </button>
          {this.state.error && (
            <p>
              Only signed-in users can post events.
              <a href="./account">Log in here!</a>
            </p>
          )}
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
            <h2>Weather Event Reports</h2>
            {!this.state.formOn && this.buttons()}
          </div>
          {this.state.formOn && this.postStorm()}
          {!this.state.formOn && (
            <div className="stormReports">
              {this.getPosts()}
              {this.getPosts()}
              {this.getPosts()}
              {this.getPosts()}
              {this.getPosts()}
              {this.getPosts()}
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }
}

export default Watch;
