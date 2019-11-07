/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5dbff23e9ef7a1181f8e0b62
*
* You will get 10% discount for each one of your friends
* 
*/
// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";
import DialogChangePwd from "../components/DialogChangePwd";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Custom Actions
import UserActions from "../redux/actions/UserActions";
import SecurityService from "../security/SecurityService";

/** APIs

* UserService.changePassword
*	@description Change password of user from admin
*	@returns object
*

**/

class Profile extends Component {
  // Init Profile
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      openChangePwd: false
    };
  }

  // Save user
  save(event) {
    event.preventDefault();
    this.props.actionsUser.saveUser(this.state.user).then(data => {
      SecurityService.updateUser(this.state.user);
      this.setState({ showMessage: true });
    });
  }

  // Close Message
  closeMessage() {
    this.setState({ showMessage: false });
  }

  // Open Change password modal
  openDialogChangePwd() {
    this.setState({ openChangePwd: true });
  }

  // Close Change password modal
  closeDialogChangePwd() {
    this.setState({ openChangePwd: false });
  }

  // Callback Change password modal
  confirmDialogChangePwd(passwordNew, passwordOld) {
    this.setState({ openChangePwd: false });
  }

  // Show contet
  render() {
    return (
      <div>
        <h1>My Profile</h1>

        <form className="myForm" onSubmit={this.save.bind(this)}>
          <TextField
            id="username"
            label="Username"
            value={this.state.user.username || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
            disabled
          />

          <TextField
            id="name"
            label="Name"
            value={this.state.user.name || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="surname"
            label="Surname"
            value={this.state.user.surname || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          <TextField
            id="mail"
            label="E-mail"
            value={this.state.user.mail || ""}
            onChange={Utils.handleChange.bind(this, "user")}
            margin="normal"
            fullWidth
          />

          {/* Confirm Message */}
          {this.state.showMessage && (
            <SnackbarContent
              style={{
                "margin-top": "30px",
                "max-width": "100%"
              }}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar">User Saved</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.closeMessage.bind(this)}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          )}

          {/* Footer */}
          <div className="footer-card">
            <Button
              onClick={this.openDialogChangePwd.bind(this)}
              variant="contained"
              color="secondary"
              style={{ float: "left" }}
            >
              Change Password
            </Button>
            <DialogChangePwd
              open={this.state.openChangePwd}
              onClose={this.closeDialogChangePwd.bind(this)}
              onConfirm={this.confirmDialogChangePwd.bind(this)}
            />
            <Link to="/users/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return {
    actionsUser: bindActionCreators(UserActions, dispatch)
  };
};

// Validate types
Profile.propTypes = {
  actionsUser: PropTypes.object.isRequired
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    user: state.LoginReducer.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
