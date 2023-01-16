import type { NextPage } from 'next'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => (
    <nav className={styles.container}>
      <ul>
        <li><a href="simple-form-validation">Test</a></li>
        <li><a href="related-input-validations">RIV</a></li>
        <li><a href="pizza">Pizza</a></li>
      </ul>
    </nav>
  )

export default Home
