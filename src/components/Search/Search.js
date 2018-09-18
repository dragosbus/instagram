import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersSearchedMiddleware } from '../../actionCreators/actions';

import {SearchResult} from '../SearchResult/SearchResult';

import './Search.css';

class Search extends Component {
  state = {
    query: '',
    inputIsFocused: false
  };

  onChangeQuery = e => {
    this.setState({query: e.target.value});
    this.props.getUsersSearched(this.state.query);
    this.showResultsOnQueryChange();
  };

  showResultsOnQueryChange = () => {
    this.setState({inputIsFocused: true});
  };

  hideResults = () => {
    this.setState({inputIsFocused: false});
  }

  render() {
    console.log(this.props);
    return (
      <div className="search-page" onClick={e=>{
        if(e.target.className !== 'query') {
          this.hideResults();
        }
      }}>
        <form>
          <input className="query" type="text" value={this.state.query} onChange={this.onChangeQuery} placeholder="Search..."/>
        </form>
        <SearchResult users={this.props.usersSearched} inpusIsFocused={this.state.inputIsFocused}/>
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
