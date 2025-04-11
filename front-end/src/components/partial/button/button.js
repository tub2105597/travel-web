import React from "react";
import './button.scss';
import { useLocation, useNavigate } from "react-router-dom";

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.location = props.location;
        this.navigate = props.navigate;
        this.destination = props.destination || '/';
    }

    handleClick = () => {
        this.navigate(this.destination);
    }

    render() {
        return (
            <div className="button-container">
                <button className="custom-btn" onClick={this.handleClick}>
                    Đăng nhập
                </button>
            </div>
        );
    }
}

const CustomButton = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let destination = props.destination;
    return <ButtonComponent location={location} navigate={navigate} destination={destination} content={props.content} changecolor={props.changecolor}
        bgcolor={props.bgcolor} color={props.color} />;
}

export default CustomButton;
