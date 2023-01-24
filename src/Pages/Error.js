import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

import styles from "../Styles/ErrorPage.module.css"

class Error extends PureComponent {
  render() {
    return (
      <div className={styles.container}>

          <div>
            <h1>404</h1>
          </div>

          <Link to="/all">
            <button className={styles.button} aria-label="Navigate to home button">Home</button>
          </Link>

      </div>
    )
  }
}

export default Error