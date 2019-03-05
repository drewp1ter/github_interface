import { connect } from 'react-redux'
import Types from 'Types'

import SearchingResults from './SearchingResults'

const mapStateToProps = (state: Types.RootState) => {
  const { fetching, error, issues } = state.issuesViewer
  return { fetching, error, issues }
}

export default connect(mapStateToProps)(SearchingResults)
