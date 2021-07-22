import {
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { menu } from '../../config'
import { Menu } from 'antd'

const { SubMenu } = Menu
const Leftnav = (): JSX.Element => (
    <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['product']} mode="inline">
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

export default Leftnav
