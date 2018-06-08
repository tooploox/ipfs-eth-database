import React from "react";

export class CustomGatewayForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    this.props.onSubmit(this.state.address);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({address: event.target.value})
  }

  render() {
    const { address } = this.state;

    return (
      <div>
        We cannot connect to any IPFS gateway. You can enter an address.
        <form onSubmit={this.handleSubmit}>
          <input type="url" value={address} onChange={this.handleChange} />
          <input type="submit" value="Connect" />
        </form>
      </div>
    );
  }
}
