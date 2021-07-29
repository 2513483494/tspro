import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

const Login = React.lazy(() => import('@pages/Login'))
const Admin = React.lazy(() => import('@pages/Admin'))
const AdminUser = React.lazy(() => import('@pages/AdminUser'))


//Switch 功能为之匹配一个就不想下进行匹配了
export const App = (): JSX.Element => (
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/admin' component={Admin}></Route>
        <Route path='/adminuser' component={AdminUser}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    </Suspense>
  </HashRouter>
)
