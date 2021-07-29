import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './style.module.less'

const ShoppingCar = lazy(() => import('./pages/ShoppingCar'))
const MainPage = lazy(() => import('./pages/MainPage'))

const AdminUser = (): JSX.Element => {
    return (
        <div className={styles.userhomebody}>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/adminuser' component={MainPage}></Route>
                    <Route exact path='/adminuser/shoppingcar' component={ShoppingCar}></Route>
                </Switch>
            </Suspense>
        </div>
    )
}

export default AdminUser
