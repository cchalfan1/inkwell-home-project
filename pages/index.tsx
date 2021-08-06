import {BaseSyntheticEvent, useEffect} from "react";
import {connect, DefaultRootState} from "react-redux"
import Head from 'next/head'
import {Pagination} from '@material-ui/lab'
import styles from '../styles/Home.module.css'
import {onFetchImages} from "../store/actions/home"
import {AppDispatch, RootState} from "../store"
import {HomeComponent, HomeState} from "../store/types"
import Images from "./components/Images"

function Home({ dispatch, images, pageNum } : HomeComponent)  {
  useEffect(() => {
    dispatch(onFetchImages(0))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Inkwell</title>
        <meta name="description" content="Inkwell" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.bcbs.com/">Inkwell!</a>
        </h1>
        <h6 className={styles.description}>
          Serving all of your anime and manga needs.
        </h6>

        <Images data={images} />

        <Pagination count={10} style={{ marginTop:'20px' }}
                    variant={'outlined'}
                    showFirstButton page={pageNum}
                    onChange={(e : BaseSyntheticEvent, val: number) => dispatch(onFetchImages(val))} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.bcbs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Inkwell, a Blue Cross Blue Shield Company
        </a>
      </footer>
    </div>
  )
}

const s2p : (state: RootState) => HomeState =
        (state : RootState) => ({ ...state.home as HomeState }),
      d2p = (dispatch : AppDispatch) => ({ dispatch });

// @ts-ignore
export default connect<HomeState, {}, DefaultRootState>(s2p, d2p)(Home)
