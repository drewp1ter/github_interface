import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import Types from 'Types'

import * as actions from '../../actions'
import Searching from './Searching'

const mapStateToProps = (state: Types.RootState) => {
  const { fetching, issues, error } = state.issuesViewer
  return { fetching, issues, error }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchIssues: actions.fetchIssues.request,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Searching)
