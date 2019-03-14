import IssuesSearchingLayout from './IssuesSearchingLayout'
import Types from 'Types'
import { connect } from 'react-redux'

const mapStateToProps = (state: Types.RootState) => {
  const { fetching, issues, error } = state.issuesViewer
  return { fetching, issues, error }
}

export default connect(mapStateToProps)(IssuesSearchingLayout)