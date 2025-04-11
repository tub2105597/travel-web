import React from "react";
import './commentcard.scss';

class CommentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="comment-card-container">
                <div className="comment-card-main">
                    <div className="comment-card-header">
                        <img src={this.props.user.avatar} alt="comment" />
                    </div>
                    <div className="comment-card-content">
                        <div className="comment-card-author">
                            <h6>{this.props.user.fullname}</h6>
                        </div>
                        <p className="comment-content">{this.props.comment.content}</p>
                    </div>
                </div>
                <div className="comment-card-footer">
                    <div className="comment-card-footer__time">
                        1 giờ trước
                    </div>
                    <div className="comment-card-footer__like">
                        <i className="fa-solid fa-heart"></i>
                        0
                    </div>
                    <div className="comment-card-footer__comment">
                        <i className="fa-solid fa-comment"></i>
                        Trả lời
                    </div>
                </div>

            </div>
        );
    }
}

export default CommentCard;