import {
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { menu } from '../../config'
import { Menu } from 'antd'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const { SubMenu } = Menu
const Leftnav = (): JSX.Element => {
    const location = useLocation()
    const [selectedMenu, setSelmenu] = useState<string[]>()
    useEffect(() => {
        const pathList = location.pathname.split('/')
        if (pathList.indexOf('productpool') !== -1) {
            setSelmenu(['productpool'])
        } else if (pathList.indexOf('storeproduct') !== -1) {
            setSelmenu(['storeproduct'])
        } else {
            setSelmenu(['admin'])
        }
    }, [location.pathname])
    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={['admin']}
            defaultOpenKeys={['product']}
            mode="inline"
            selectedKeys={selectedMenu}
        >
            {
                menu.map((item) => {
                    if (item.children) {
                        return (
                            <SubMenu key="product" icon={<UserOutlined />} title={item.title}>
                                {item.children.map((child) => (
                                    <Menu.Item key={child.key}>
                                        <Link to={child.path}>
                                            <span>{child.title}</span>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        )
                    } else {
                        return (
                            <Menu.Item key={item.key} icon={<DesktopOutlined />}>
                                <Link to={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    }
                })
            }
        </Menu>
    )
}

export default Leftnav
