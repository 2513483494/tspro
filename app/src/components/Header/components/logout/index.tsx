import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.less'
import { useHistory } from 'react-router-dom'

const Logout = () => {
    const history = useHistory()
    const quit = () => {
        localStorage.setItem('isLogedIn', 'false')
        localStorage.setItem('currentUser', '')
        history.push('/login')
    }
    const delinfo = () => {
        const u = localStorage.getItem("users")
        const users = u ? JSON.parse(u) : []
        for (let i in users) {
            if (users[i].name === localStorage.getItem('currentUser')) {
                users.splice(i, 1)
                localStorage.setItem('users', JSON.stringify(users))
                break
            }
        }
        localStorage.setItem('currentUser', '')
        localStorage.setItem('isLogedIn', 'false')
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
                <span className='logouttext'>{localStorage.getItem('currentUser')}</span>
            </Button>
        </Dropdown>
    )
}

export default Logout
