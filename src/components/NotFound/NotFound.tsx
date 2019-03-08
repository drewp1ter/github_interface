import * as React from 'react'

import styles from './notFound.module.scss'

export default () =>
  <div className={styles.box}>
    <h1>404</h1>
    <h3>Page Not Found</h3>
    <div>
      Sorry, but the page you are looking for has note been found. Try checking the URL for error, then hit the refresh button on your browser.
    </div>
  </div>