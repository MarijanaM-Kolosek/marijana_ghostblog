import React, { Component } from "react";
import { authService } from "../services/auth.service";
import { Post } from "./Post";

export class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      filteredPosts: [],
      authors: [],
      tags: [],
    };

    if (!authService.currentUserValue) {
      this.props.history.push("/login");
    }
  }

  getAllPosts() {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&include=authors,tags`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({ allPosts: data.posts, filteredPosts: data.posts })
      );
  }

  getAuthors() {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ authors: data.authors }));
  }

  getTags() {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ tags: data.tags }));
  }

  componentDidMount() {
    this.getAllPosts();
    this.getAuthors();
    this.getTags();
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sameDay(date1, date2) {
    if (date1 !== undefined && date2 !== undefined) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    }
  }

  filterByDate(e) {
    if (e.target.value) {
      this.setState({
        filteredPosts: [
          ...this.state.allPosts.filter((post) => {
            return this.sameDay(post.published_at, e.target.value);
          }),
        ],
      });
    } else {
      this.setState({ filteredPosts: [...this.state.allPosts] });
    }
  }

  filterByAuthor(e) {
    if (e.target.value !== "") {
      this.setState({
        filteredPosts: [
          ...this.state.allPosts.filter((post) =>
            post.authors.some((author) => author.id === e.target.value)
          ),
        ],
      });
    } else {
      this.setState({ filteredPosts: [...this.state.allPosts] });
    }
  }

  filterByTags(e) {
    if (e.target.value !== "") {
      this.setState({
        filteredPosts: [
          ...this.state.allPosts.filter((post) =>
            post.tags.some((tag) => tag.id === e.target.value)
          ),
        ],
      });
    } else {
      this.setState({ filteredPosts: [...this.state.allPosts] });
    }
  }

  render() {
    const { filteredPosts, authors, tags, showFilters } = this.state;
    // posts.sort((a, b) => b.published_at.localeCompare(a.timestamp));
    return (
      <React.Fragment>
        <div className="filtersContainer">
          <p className="filtersLabel">Filter posts by:</p>
          <select
            className="filtersSelectInput"
            name="selectAuthorFilter"
            onChange={(e) => this.filterByAuthor(e)}
          >
            <option value="">Choose author</option>
            {authors.map((author) => (
              <option value={author.id}>{author.name}</option>
            ))}
          </select>
          <select
            className="filtersSelectInput"
            name="selectTagFilter"
            onChange={(e) => this.filterByTags(e)}
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
            onChange={(e) => this.filterByDate(e)}
          />
        </div>
        <div className="postsContainer">
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post}></Post>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default BlogPage;
