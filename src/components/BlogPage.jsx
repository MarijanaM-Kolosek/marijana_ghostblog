import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authService } from "../services/auth.service";
import { Post } from "./Post";
import { fetchPosts } from "../redux/actions/postsActions";
import { fetchAuthors } from "../redux/actions/authorsActions";
import { fetchTags } from "../redux/actions/tagsActions";

const BlogPage = (props) => {
  const dispatch = useDispatch();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const posts = useSelector((state) => state.posts.posts);
  const authors = useSelector((state) => state.authors.authors);
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    dispatch(fetchPosts());
    dispatch(fetchAuthors());
    dispatch(fetchTags());

    setFilteredPosts([...posts]);
  }, []);

  const sameDay = (date1, date2) => {
    if (date1 && date2) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    }
  };

  const filterByDate = (e) => {
    if (e.target.value) {
      setFilteredPosts([
        ...posts.filter((post) => {
          return sameDay(post.published_at, e.target.value);
        }),
      ]);
    } else {
      setFilteredPosts([...posts]);
    }
  };

  const filterByAuthor = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...posts.filter((post) =>
          post.authors.some((author) => author.id === e.target.value)
        ),
      ]);
    } else {
      setFilteredPosts([...posts]);
    }
  };

  const filterByTags = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...posts.filter((post) =>
          post.tags.some((tag) => tag.id === e.target.value)
        ),
      ]);
    } else {
      setFilteredPosts([...posts]);
    }
  };

  return (
    <React.Fragment>
      <div className="filtersContainer">
        <p className="filtersLabel">Filter posts by:</p>
        <select
          className="filtersSelectInput"
          name="selectAuthorFilter"
          onChange={(e) => filterByAuthor(e)}
        >
          <option value="">Choose author</option>
          {authors.map((author) => (
            <option value={author.id}>{author.name}</option>
          ))}
        </select>
        <select
          className="filtersSelectInput"
          name="selectTagFilter"
          onChange={(e) => filterByTags(e)}
        >
          <option value="">Choose tag</option>
          {tags.map((tag) => (
            <option value={tag.id}>{tag.name}</option>
          ))}
        </select>
        <input
          className="filtersSelectInput"
          type="date"
          name="date"
          onChange={(e) => filterByDate(e)}
        />
      </div>
      <div className="postsContainer">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </React.Fragment>
  );
};

export default BlogPage;
