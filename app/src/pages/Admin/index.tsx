import { Suspense, useState, lazy } from 'react'
import { Layout } from 'antd'
import Leftnav from '@components/leftnav'
import Header from '@components/Header'
import { Redirect, Route, Switch } from 'react-router-dom'
import './index.less'

const Productpool = lazy(() => import('../product/productPool'))
const StoreProduct = lazy(() => import('../product/storeProduct'))

const { Content, Footer, Sider } = Layout


const Admin = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState()
    if (!localStorage.getItem('username')) {
        return <Redirect to='/login'></Redirect>
    }
    const onCollapse = (collapsed: any) => {
        setCollapsed(collapsed)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Leftnav />
            </Sider>

            <Layout className="site-layout">
                <Header />
                <Content style={{ margin: '0 16px' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/admin/storeproduct' component={StoreProduct}></Route>
                            <Route exact path='/admin/productpool' component={Productpool}></Route>
                        </Switch>
                    </Suspense>
                </Content>
                <Footer style={{ textAlign: 'center' }}>XJQ FROM UESTC @LOCATED IN CD</Footer>
            </Layout>
        </Layout>
    )
}

export default Admin
