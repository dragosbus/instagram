import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchActivity} from '../../actionCreators/getActivity';

class Activity extends Component {
  componentDidMount() {
    this.props.fetchActivity(this.props.userId);
  }
  render() {
    let {activity} = this.props;
    
    return(
      <div className="activity">
        {
          activity.length > 0 ?
          <ul>
            {
              activity.map(el=>{
                return <li></li>
              })
            }
          </ul> : 'no'
        }
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