import React from "react";
import Header from "./header";
import Footer from "./footer";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
      signedIn: false,
    };
  }

  accountForm() {
    if (this.state.formType === "login") {
      return (
        <form className="login">
          <label>
            Username: <input type="text" name="username" className="username" />
          </label>
          <label>
            Password: <input type="password" name="pwd" className="pwd" />
          </label>
          <button
            onClick={() => {
              this.setState({ signedIn: true });
            }}
          >
            Log in!
          </button>
        </form>
      );
    } else if (this.state.formType === "signup") {
      return (
        <form className="signup">
          <label>
            Create Username:{" "}
            <input
              type="text"
              name="username"
              className="username"
              placeholder="myusername123"
              required
            />
          </label>
          <label>
            Create a password using letters AND numbers:
            <input type="password" name="pwd" className="pwd" required />
          </label>
          <label>
            Recovery Email:
            <input type="email" name="email" className="email" />
          </label>
          <button
            onClick={() => {
              this.setState({ formType: "login" });
            }}
          >
            Create Account!
          </button>
        </form>
      );
    }
  }

  buttons() {
    return (
      <div className="buttons">
        <h2>Account</h2>
        <div>
          <button onClick={() => this.setState({ formType: "login" })}>
            Log in!
          </button>
          <button onClick={() => this.setState({ formType: "signup" })}>
            Create an Account!
          </button>
        </div>
      </div>
    );
  }

  myaccount() {
    return (
      <div className="myaccount">
        <p>Username: {}</p>
        <p>Password: ********</p>
        <p>Email: {}</p>
        <button>Change Username</button>
        <button>Change Password</button>
        <button>Change Email</button>
        <button>Logout</button>
        <button className="hazard">Delete Account</button>
      </div>
    );
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <Header />
        <main className="account">
          {/* if not signed in */}
          {this.state.signedIn === false && this.buttons()}
          {this.accountForm()}

          {/* if signed in... */}
          {this.state.signedIn === true && this.myaccount()}
        </main>
        <Footer />
      </>
    );
  }
}

export default Account;
