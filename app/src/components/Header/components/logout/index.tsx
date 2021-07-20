import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.less'
import { useHistory } from 'react-router-dom'

const username = localStorage.getItem('username')
const Logout = () => {
    const history = useHistory()
    const quit = () => {
        history.push('/login')
    }
    const delinfo = () => {
        localStorage.clear()
        history.push('/login')
    }
    const menu = (
        <Menu>
            <Menu.Item key='del'>
                <Button type='link' onClick={delinfo}>
                    注销
                </Button>
            </Menu.Item>
            <Menu.Item key='quit'>
                <Button type='link' onClick={quit} >
                    退出登录
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu}>
            <Button type='link'>
                <DownOutlined />
                <span className='logouttext'>{username}</span>
            </Button>
        </Dropdown>
    )
}

export default Logout
