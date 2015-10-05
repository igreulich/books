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
      coop:      '',
      link:      '',
      name:      '',
      players:   '',
      expansion: ''
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
                <Col xs={12}>
                  <Input type='text' ref='bookName' placeholder='Enter book' onChange={this.onNameChange} value={this.state.name} />
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
      coop:      '',
      link:      '',
      name:      '',
      players:   '',
      expansion: ''
    });
  },

  onNameChange(event) {
    this.setState({name: event.target.value})
  }
});
