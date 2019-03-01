import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Types from 'Types'

import * as actions from '../../actions'
import Searching from './Searching'

const mapStateToProps = (state: Types.RootState) => {
  const { fetching, error, issues } = state.issuesViewer
  return { fetching, error, issues }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchIssues: actions.fetchIssues.request
}, dispatch)

const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(Searching)
export default WrappedComponent
