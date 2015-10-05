'use strict';

const {
  Grid,
  Row,
  Col,
  Input,
  Button
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'NewBookForm',

  getInitialState() {
    return {
      name:   '',
      author: ''
    };
  },

  render() {
    const showForm = this.props.user ? true : false;
    var formStyles = {
      display: showForm ? '' : 'none'
    };

    return (
      <section style={formStyles} className="content">
        <Grid>
          <form onSubmit={this.submit}>
            <Input label="New Book" wrapperClassName="wrapper">
              <Row>
                <Col xs={6}>
                  <Input type='text' ref='bookName' placeholder='Enter book' onChange={this.onNameChange} value={this.state.name} />
                </Col>
                <Col xs={6}>
                  <Input type='text' ref='bookAuthor' placeholder='Enter author' onChange={this.onAuthorChange} value={this.state.author} />
                </Col>
              </Row>
            </Input>
            <Button className="pull-right btn-link" type="submit">Save</Button>
          </form>
        </Grid>
      </section>
    );
  },

  submit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state);

    this.setState({
      name:   '',
      author: ''
    });
  },

  onNameChange(event) {
    this.setState({name: event.target.value})
  },

  onAuthorChange(event) {
    this.setState({author: event.target.value})
  }

});
