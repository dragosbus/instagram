import React, {Component} from 'react';

class Search extends Component {

  state = {
    query: ''
  };

  onChangeQuery = e => {
    this.setState({query: e.target.value});
  };

  render() {
    return(
      <div className="search-page">
        <form>
          <input type="text" value={this.state.query} onChange={this.onChangeQuery}/>
        </form>
      </div>
    );
  }
}

export default Search;