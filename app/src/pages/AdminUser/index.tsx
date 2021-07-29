import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
const ShoppingCar = lazy(() => import('./pages/ShoppingCar'))
const MainPage = lazy(() => import('./pages/MainPage'))

const AdminUser = (): JSX.Element => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path='/adminuser' component={MainPage}></Route>
                    <Route exact path='/adminuser/shoppingcar' component={ShoppingCar}></Route>
                </Switch>
            </Suspense>
        </>
    )
}

export default AdminUser
