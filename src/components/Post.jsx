import React from "react";
import * as moment from "moment";

const Post = (props) => {
  return (
    <div className="post">
      <img className="postImage" src={props.post.feature_image}></img>
      <h4>{props.post.title}</h4>
      <div className="postExcerpt">
        {props.post.excerpt.length > 250
          ? props.post.excerpt.slice(0, 250)
          : props.post.excerpt}
        {"..."}
      </div>
      <p>{moment(props.post.published_at).format("LLL")}</p>
      <div className="authorInfoDiv">
        {props.post.authors.map((author) => (
          <React.Fragment>
            <img className="authorImage" src={author.profile_image}></img>
            {author.name}
          </React.Fragment>
        ))}
      </div>
      <div className="postTagsDiv">
        tags:
        {props.post.tags.map((tag) => (
          <React.Fragment> {tag.name} </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export { Post };
