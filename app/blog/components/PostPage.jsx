import React from "react";
import marked from "marked";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const gateways = [
  "http://54.93.56.226:8080/ipfs",
  "https://ipfs.io/ipfs"
];

export class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost() {
    const { hash } = this.props.match.params;

    fetch(`${gateways[0]}/${hash}`)
      .then(response => response.json())
      .then(post => this.setState({ post }));
  }

  render() {
    const { post } = this.state;
    const { author, hash } = this.props.match.params;


    if (!post) {
      return <div>Loading {hash}...</div>;
    }

    return (
      <div>
        <article>
          <h1><Link to={`/u/${author}/${hash}`}>{post.title}</Link></h1>
          Date: {format(new Date(post.timestamp * 1000), "HH:mm YYYY-MM-dd")}{" | "}
          Author: <Link to={`/u/${author}`}>{author}</Link>
          <div dangerouslySetInnerHTML={{ __html: marked(post.content) }}></div>
        </article>
      </div>
    );
  }
}
