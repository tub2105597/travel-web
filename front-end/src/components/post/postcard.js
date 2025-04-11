import React from "react";
import Avatar from '../../assets/images/default-avt.jpg';
import './postcard.scss';

class PostCard extends React.Component {

    truncateContent(content, wordLimit) {
        const words = content.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return content;
    }

    render() {
        const content = this.truncateContent(this.props.content, 30);
        return (
            <div className="post-container">
                <div className="post-image">
                    <img src={this.props.image} alt='destination' />
                </div>
                <div className="post-wrap">
                    <div className="post-content">
                        <div className="post-title">{this.props.title}</div>
                        <div className="post-description">
                            {content}
                        </div>
                    </div>
                    <div className="post-info">
                        <div className="post-author">
                            <div className="post-author-avatar">
                                <img src={Avatar} alt='author' />
                            </div>
                            <div className="post-author-wrap">
                                <div className="post-author-name">
                                    {this.props.author}
                                </div>
                                <div className="post-author-date">
                                    {this.props.date}
                                </div>
                            </div>
                        </div>
                        <span className="post-comment">
                            10 &nbsp;
                            <i className="fa-regular fa-message" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostCard;