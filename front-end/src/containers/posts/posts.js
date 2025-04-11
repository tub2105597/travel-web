import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

class PostsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="posts-container">
                <h1>Posts</h1>
            </div>
        );
    }
}

const Posts = (props) => {
    let navigate = useNavigate();
    let location = useLocation();
    return <PostsComponent navigate={navigate} location={location} {...props} />;
}

export default Posts;