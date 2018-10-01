import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import snackbarContentStyle from "assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx";
import SelectedPendukungAction from "../../action/selected_pendukung_action";

class DetailPendukung extends React.Component {
  constructor(props) {
    super(props);

    this.state = { detailPendukung: {} };

    this.getDetailPendukung();
  }

  getDetailPendukung() {
    fetch('http://128.199.101.218:8181/pemilu/getPendukung?nik='+this.props.nik, {
        method: 'GET',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        headers: {
          "token": sessionStorage.getItem("key")
        }
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      this.setState({ detailPendukung: result });
    })
  }
  
  render() {
    const { classes, message, color, close, icon } = this.props;
    var action = [];
    // const messageClasses = classNames({
    //   [classes.iconMessage]: icon !== undefined
    // });
    if (close !== undefined) {
      action = [
        <IconButton
          // className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
        >
          <Close />
        </IconButton>
      ];
    }

    return (
      <Snack
        message={
          <div>
            {icon !== undefined ? <props.icon className={classes.icon} /> : null}
            <br/>
            <span className={this.props.classes}><h3>Data Detail Pendukung</h3></span>
            <br/>
            <span className={this.props.classes}>
              <img src={this.state.detailPendukung.photo} width="130" height="130"/>
            </span>
            <br/>
            <span className={this.props.classes}>Name      : {this.state.detailPendukung.name}</span>
            <br/>
            <span className={this.props.classes}>NIK       : {this.state.detailPendukung.nik}</span>
            <br/>
            <span className={this.props.classes}>Phone     : {this.state.detailPendukung.phone}</span>
            <br/>
            <span className={this.props.classes}>Provinsi  : {this.state.detailPendukung.provinsi}</span>
            <br/>
            <span className={this.props.classes}>Kabupaten : {this.state.detailPendukung.kabupaten}</span>
            <br/>
            <span className={this.props.classes}>Kecamatan : {this.state.detailPendukung.kecamatan}</span>
          </div>
        }
        action={action}
      />
    );
  }
}

DetailPendukung.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func
};

const mapStateToProps = (state, props) => ({
  selectedPendukung: state.selected_pendukung
});

const mapDispatchToProps = dispatch => ({
  showSelectedPendukung: nik => {
    dispatch(SelectedPendukungAction.elements(nik));
  },
});

export { DetailPendukung };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPendukung);