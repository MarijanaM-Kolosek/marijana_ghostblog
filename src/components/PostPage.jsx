import React from "react";
import * as moment from "moment";

const PostPage = (props) => {
  const post = props.history.location.state.post;
  return (
    <div className="postPageDiv">
      <h3>{post.title}</h3>
      <p>tags: {post.tags.map((tag) => tag.name + " ")}</p>
      <p className="postPageExcerpt">{post.excerpt}</p>

      {post.authors.map((author) => (
        <React.Fragment>
          <img className="authorImage" src={author.profile_image}></img>
          {author.name}
        </React.Fragment>
      ))}
      <p>{moment(post.published_at).format("LLL")}</p>
      <p>reading time: {post.reading_time} min</p>
      <p>
        <img className="postPageImage" src={post.feature_image}></img>
      </p>
    </div>
  );
};

export { PostPage };
