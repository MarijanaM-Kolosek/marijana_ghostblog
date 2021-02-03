import React, { Component } from "react";
import { authService } from "../services/auth.service";
import { Post } from "./Post";

export class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };

    if (!authService.currentUserValue) {
      this.props.history.push("/login");
    }
  }

  getPosts() {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&include=authors,tags`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data.posts }));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    const { posts } = this.state;
    // posts.sort((a, b) => b.published_at.localeCompare(a.timestamp));
    return (
      <React.Fragment>
        <div className="postsContainer">
          {posts.map((post) => (
            <Post key={post.id} post={post}></Post>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BlogPage;
