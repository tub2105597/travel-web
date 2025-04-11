import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './footer.scss';
import { ChatBot } from "../../components";

const Footer = ({ user }) => {
    return (
        <>
            {console.log(user)}
            {user.role && user.role == 'user' && <ChatBot />}
            <div className="footer">
                <div className="footer-wrap">
                    <div className="footer-social">
                        <div className="footer-social__content">
                            <Link to="#">
                                <i className="fab fa-facebook-square" />
                            </Link>
                            <Link to="#">
                                <i className="fab fa-twitter-square" />
                            </Link>
                            <Link to="#">
                                <i className="fab fa-instagram-square" />
                            </Link>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        &copy; 2024 Coyyright
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    };
}

export default connect(mapStateToProps)(Footer);