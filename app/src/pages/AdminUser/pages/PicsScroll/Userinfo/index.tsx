import { Button } from 'antd'
import user from '../imgs/5.jpeg'
import styles from './style.module.less'
import { useHistory } from 'react-router-dom'

const Userinfo = () => {
    const history = useHistory()
    const username = localStorage.getItem('currentUser')
    const quit = () => {
        localStorage.setItem('isLogedIn', 'false')
        localStorage.setItem('currentUser', '')
        history.replace('/login')
    }
    return (
        <div className={styles.userinfo}>
            <div className={styles.usertop}>
                <div className={styles.userpic}>
                    <img src={user} alt='1' />
                </div>
                <span>Hi,{username}</span>
                <Button type='link' onClick={quit}>退出</Button>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}

export default Userinfo
