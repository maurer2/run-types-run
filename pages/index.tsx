import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li><a href="http://localhost:3000/simple-form-validation">Test</a></li>
        <li><a href="http://localhost:3000/related-input-validations">RIV</a></li>
      </ul>
    </div>
  )
}

export default Home
