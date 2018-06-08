import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { BlogEvents } from "../contracts/BlogContract";

export class ArchivePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addedPosts: []
    };
  }

  componentDidMount() {
    this.getAddedPosts();
  }

  getAddedPosts() {
    const { author } = this.props.match.params;

    BlogEvents.getPastEvents("PostAdded", { fromBlock: 0, filter: { author } }).then(events => {
      this.setState({ addedPosts: events.map(e => e.returnValues) });
    });
  }

  render() {
    const { author } = this.props.match.params;
    const { addedPosts } = this.state;

    return (
      <div>
        <section>
          <h1>{author} blog</h1>
          {addedPosts.map(post => (
            <article>
              <h2><Link to={`/u/${post.author}/${post.hash}`}>{post.title}</Link></h2>
              Date: {format(new Date(post.timestamp * 1000), "HH:mm YYYY-MM-dd")}
            </article>
          ))}
        </section>
      </div>
    );
  }
}
