import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersSearchedMiddleware } from '../../actionCreators/actions';
class Search extends Component {
  state = {
    query: ''
  };

  onChangeQuery = e => {
    this.setState({query: e.target.value});
    this.props.getUsersSearched(this.state.query);
  };

  render() {
    console.log(this.props);
    return (
      <div className="search-page">
        <form>
          <input type="text" value={this.state.query} onChange={this.onChangeQuery} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usersSearched: state.usersSearched
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsersSearched: getUsersSearchedMiddleware
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
