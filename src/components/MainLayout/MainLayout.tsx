import * as React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from './mainLayout.module.scss'

const MainLayout: React.StatelessComponent<RouteConfigComponentProps> = ({ route }) => (
  <div className={styles.main}>
    {route && renderRoutes(route.routes)}
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  </div>
)

export default MainLayout
