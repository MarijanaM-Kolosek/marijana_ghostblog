import React, { Component } from "react";
import { authService } from "../services/auth.service";

export class AuthorsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
    };
    if (!authService.currentUserValue) {
      this.props.history.push("/login");
    }
  }
  getAuthors() {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062&include=count.posts`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ authors: data.authors }));
  }
  componentDidMount() {
    this.getAuthors();
  }

  render() {
    const { authors } = this.state;
    return (
      <div>
        {authors.map((author) => (
          <table className="authorTable" key={author.id}>
            <tbody>
              <tr>
                <td rowSpan="2" className="tdAuthorImage">
                  <img
                    src={author.profile_image}
                    className="authorImageInTd"
                  ></img>
                </td>
                <td className="tdAuthorName">{author.name}</td>

                <td>total number of posts: {author.count.posts}</td>
              </tr>
              <tr>
                <td colSpan="2">{author.bio}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

export default AuthorsPage;
