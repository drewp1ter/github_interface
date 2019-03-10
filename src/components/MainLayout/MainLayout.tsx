import * as React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

import styles from './mainLayout.module.scss'

const MainLayout: React.StatelessComponent<RouteConfigComponentProps> = ({ route }) => (
  <div className={styles.main}>{route && renderRoutes(route.routes)}</div>
)

export default MainLayout
