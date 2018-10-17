import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchActivity} from '../../actionCreators/getActivity';

class Activity extends Component {
  componentDidMount() {
    this.props.fetchActivity(this.props.userId);
  }
  render() {
    return(
      <div className="activity">
        activity
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activity: state.activity
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchActivity: fetchActivity
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Activity);