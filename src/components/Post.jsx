import React, { Component } from "react";
import * as moment from "moment";

export class Post extends Component {
  render() {
    const { post } = this.props;
    const postDate = moment(post.published_at).format("LLL");
    return (
      <div className="post">
        <img className="postImage" src={post.feature_image}></img>
        <h4>{post.title}</h4>
        <div className="postExcerpt">
          {post.excerpt.length > 250
            ? post.excerpt.slice(0, 250)
            : post.excerpt}
          {"..."}
        </div>
        <p>{postDate}</p>
        <div className="authorInfoDiv">
          {post.authors.map((author) => (
            <React.Fragment>
              <img className="authorImage" src={author.profile_image}></img>
              {author.name}
            </React.Fragment>
          ))}
        </div>
        <div className="postTagsDiv">
          tags:
          {post.tags.map((tag) => (
            <React.Fragment> {tag.name} </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Post;
