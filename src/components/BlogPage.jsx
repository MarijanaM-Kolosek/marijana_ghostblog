import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import { authService } from "../services/auth.service";
import { Post } from "./Post";
import { fetchPosts, createNewPostAction } from "../redux/actions/postsActions";
import { fetchAuthors } from "../redux/actions/authorsActions";
import { fetchTags } from "../redux/actions/tagsActions";
import AddTags from "./AddTags";

const BlogPage = (props) => {
  const dispatch = useDispatch();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [title, setTitle] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [tagsToAdd, setTagsToAdd] = useState([]);
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

  const searchByTitle = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...posts.filter((post) =>
          post.title.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      ]);
    } else {
      setFilteredPosts([...posts]);
    }
  };

  const searchById = (e) => {
    if (e.target.value !== "") {
      setFilteredPosts([
        ...posts.filter((post) =>
          post.id.toLowerCase().includes(e.target.value.toLowerCase())
        ),
      ]);
    } else {
      setFilteredPosts([...posts]);
    }
  };

  const compareBy = (key) => {
    return function (a, b) {
      if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
      return 0;
    };
  };

  const sortPosts = (e) => {
    let arrayCopy = [...posts];
    if (e.target.value === "titleAsc") {
      arrayCopy.sort(compareBy("title"));
    } else if (e.target.value === "titleDesc") {
      arrayCopy.sort(compareBy("title"));
      arrayCopy.reverse();
    } else if (e.target.value === "dateAsc") {
      arrayCopy.sort((a, b) => b.published_at.localeCompare(a.timestamp));
    } else if (e.target.value === "dateDesc") {
      arrayCopy.sort((a, b) => b.published_at.localeCompare(a.timestamp));
      arrayCopy.reverse();
    }
    setFilteredPosts([...arrayCopy]);
  };

  const toggleCreateNewPost = (e) => {
    setCreatePostModal(!createPostModal);
  };

  const createNewPost = (e) => {
    const newPost = {
      id: uuidv4(),
      title: title,
      feature_image: image,
      published_at: new Date(),
      authors: [
        {
          name: authService.currentUserValue.username,
          profile_image: authService.currentUserValue.image,
        },
      ],
      tags: [...tagsToAdd],
      excerpt: excerpt,
      reading_time: readingTime,
    };
    dispatch(createNewPostAction(newPost));
    setFilteredPosts([newPost, ...filteredPosts]);
  };

  const addTagToPost = (selectedTag) => {
    setTagsToAdd([...tagsToAdd, JSON.parse(selectedTag)]);
  };

  const createTag = (newTagName) => {
    const newTag = { id: uuidv4(), name: newTagName };
    setTagsToAdd([...tagsToAdd, newTag]);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
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
        <p className="filtersLabel">Search posts by:</p>
        <input
          className="regularInput"
          type="text"
          name="searchByTitle"
          onChange={(e) => searchByTitle(e)}
          placeholder="Search posts by title"
        />
        <input
          className="regularInput"
          type="text"
          name="searchById"
          onChange={(e) => searchById(e)}
          placeholder="Search posts by ID"
        />
        <p className="filtersLabel">Sort posts by:</p>
        <select
          className="sortSelectInput"
          name="selectSort"
          onChange={(e) => sortPosts(e)}
        >
          <option value="">Choose option to sort by</option>
          <option value="titleAsc">Title ascending</option>
          <option value="titleDesc">Title descending</option>
          <option value="dateAsc">Date ascending</option>
          <option value="dateDesc">Date descending</option>
        </select>
        <button
          className="createNewPostBtn"
          onClick={(e) => toggleCreateNewPost(e)}
        >
          Create new post
        </button>
      </div>

      <Modal show={createPostModal} onHide={(e) => toggleCreateNewPost(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="createPostModalDiv">
            <input
              className="createPostInputs"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeHolder="Title"
              required
            />
            <br />
            <input
              className="createPostInputs"
              type="readingTime"
              name="readingTime"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              placeholder="Reading time (min)"
              required
            />
            <br />
            <textarea
              className="createPostInputs"
              type="text"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Text"
              required
            />
            <p>{tagsToAdd.map((tag) => tag.name + " ")}</p>
            <AddTags
              addTagToPost={addTagToPost}
              createTag={createTag}
            ></AddTags>
            <img className="profileImage" src={image} />
            <input
              className="selectImageBtn"
              type="file"
              name="myImage"
              onChange={(e) => onImageChange(e)}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="createTagButtons"
            onClick={(e) => toggleCreateNewPost(e)}
          >
            Close
          </button>
          <button
            className="createTagButtons"
            onClick={(e) => createNewPost(e)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      <div className="postsContainer">
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </React.Fragment>
  );
};

export default BlogPage;
