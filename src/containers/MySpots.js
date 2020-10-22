import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux"


class MySpots extends Component {

    render() {
        return (
            <div style={{minHeight: "90vh", textAlign: "center", color: "#FFE485", marginTop: 25, marginBottom: 35}}>
                <h3>My Spots</h3>
            </div>
        );
    }
}

MySpots.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(MySpots);