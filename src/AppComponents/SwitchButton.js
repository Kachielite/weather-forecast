import React, { Component } from "react";
import Switch from "react-switch";
import HistoryIcon from '@material-ui/icons/History';


class SwitchButton extends Component {
    constructor() {
      super();
      this.state = { checked: true };
      this.handleChange = this.handleChange.bind(this);
    }


  
    handleChange(checked) {
      this.setState({ checked });
      this.props.searchHistoryHandler()
    }
  
    render() {
      return (
        <label>
          <label htmlFor="small-radius-switch">
                {/* <span>A switch all available styling options</span> */}
                <Switch
                    checked={this.state.checked}
                    onChange={this.handleChange}
                    handleDiameter={28}
                    offColor="#B6B5B5"
                    onColor="#4FBC90"
                    offHandleColor="#fff"
                    onHandleColor="#fff"
                    height={40}
                    width={70}
                    borderRadius={6}
                    activeBoxShadow="0px 0px 1px 2px #B6B5B5"
                    uncheckedIcon={
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "#fff",
                        paddingRight: 2
                        }}
                    >
                        Off
                    </div>
                    }
                    checkedIcon={
                        <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "#fff",
                        paddingRight: 2
                        }}
                    >
                        On
                    </div>
                    }
                    uncheckedHandleIcon={
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "#B6B5B5",
                        fontSize: 20
                        }}
                    >
                        <HistoryIcon/>
                    </div>
                    }
                    checkedHandleIcon={
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        color: "#4FBC90",
                        fontSize: 20
                        }}
                    >
                        <HistoryIcon/>
                    </div>
                    }
                    className="react-switch"
                    id="small-radius-switch"
                />
                </label>
        </label>
      );
    }
}


export default SwitchButton;