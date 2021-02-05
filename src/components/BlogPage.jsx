import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { Post } from "./Post";

const BlogPage = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    getAllPosts();
    getAuthors();
    getTags();
  }, []);

  const getAllPosts = () => {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&include=authors,tags`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data.posts);
        setFilteredPosts(data.posts);
      });
  };

  const getAuthors = () => {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062`
    )
      .then((res) => res.json())
      .then((data) => setAuthors(data.authors));
  };

  const getTags = () => {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062`
    )
      .then((res) => res.json())
      .then((data) => setTags(data.tags));
  };

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
        ...allPosts.filter((post) => {
          return sameDay(post.published_at, e.target.value);
        }),
      ]);
    } else {
      setFilteredPosts([...allPosts]);
    }
  };

  const filterByAuthor = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...allPosts.filter((post) =>
          post.authors.some((author) => author.id === e.target.value)
        ),
      ]);
    } else {
      setFilteredPosts([...allPosts]);
    }
  };

  const filterByTags = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...allPosts.filter((post) =>
          post.tags.some((tag) => tag.id === e.target.value)
        ),
      ]);
    } else {
      setFilteredPosts([...allPosts]);
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

export { BlogPage };
