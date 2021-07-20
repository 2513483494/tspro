import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { Login } from './pages/Login'
// import { Admin } from './pages/Admin'
const Login = React.lazy(() => import('./pages/Login'))
const Admin = React.lazy(() => import('./pages/Admin'))

//Switch 功能为之匹配一个就不想下进行匹配了
export const App = (): JSX.Element => (
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/admin' component={Admin}></Route>
        <Route path='/' component={Login}></Route>
      </Switch>
    </Suspense>
  </HashRouter>
)
