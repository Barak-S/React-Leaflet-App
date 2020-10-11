import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"

class Profile extends Component {
    render() {
        return (
            <div style={{minHeight: "100vh", textAlign: "center", color: "#FFE485", marginTop: 25}}>
                <h6>Profile</h6>
                <h3>{this.props.auth.user.name}</h3>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Profile);