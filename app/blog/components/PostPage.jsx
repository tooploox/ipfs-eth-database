import React from "react";
import marked from "marked";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { CustomGatewayForm } from "./CustomGatewayForm";

const gateways = [
  "http://54.93.56.226:8080/ipfs",
  "https://ipfs.io/ipfs",
  "https://gateway.ipfs.io/ipfs",
  "https://ipfs.infura.io/ipfs",
  "https://rx14.co.uk/ipfs",
  "https://xmine128.tk/ipfs",
  "https://upload.global/ipfs",
  "https://ipfs.jes.xxx/ipfs",
  "https://catalunya.network/ipfs",
  "https://siderus.io/ipfs",
  "https://www.eternum.io/ipfs",
  "https://hardbin.com/ipfs",
  "https://ipfs.macholibre.org/ipfs",
  "https://ipfs.works/ipfs",
  "https://ipfs.work/ipfs",
  "https://ipfs.wa.hle.rs/ipfs",
  "https://api.wisdom.sh/ipfs",
  "https://gateway.blocksec.com/ipfs",
  "https://ipfs.renehsz.com/ipfs",
];


export class PostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      customGatewayFormVisible: false,
    };

    this.handleConnectCustomAddress = this.handleConnectCustomAddress.bind(this);
  }

  componentDidMount() {
    this.getPost();
  }

  getPost(gatewayIndex = 0) {
    this.fetchPostFromIpfs(gateways[gatewayIndex])
      .catch(() => this.retry(gatewayIndex))
  }

  fetchPostFromIpfs(gateway) {
    const { hash } = this.props.match.params;

    return fetch(`${gateway}/${hash}`)
           .then(response => {
             response
               .json()
               .then(post => this.setState({ post: post, customGatewayFormVisible: false }))
           })
  }

  retry(gatewayIndex) {
    if(gateways.length > gatewayIndex + 1) {
      this.getPost(gatewayIndex + 1)
    } else {
      this.showCustomGatewayForm()
    }
  }

  showCustomGatewayForm() {
    this.setState({ customGatewayFormVisible: true })
  }

  handleConnectCustomAddress(address) {
    this.fetchPostFromIpfs(address);
  }

  render() {
    const { post, customGatewayFormVisible } = this.state;
    const { author, hash } = this.props.match.params;

    if (customGatewayFormVisible) {
      return (
        <CustomGatewayForm onSubmit={this.handleConnectCustomAddress}/>
      );
    }

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
