import { Button, Divider } from 'antd'
import user from '../imgs/5.jpeg'
import styles from './style.module.less'
import { useHistory } from 'react-router-dom'
import p6 from './imgs/6.png'

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
                <div>
                    <p>Hi,{username}</p>
                    <Button type='link' onClick={quit}>退出</Button>
                </div>
            </div>
            <div className={styles.bemenmber}>
                <Button type='link'>
                    <div className={styles.joinus}>
                        加入会员，享受五折好礼！
                    </div>
                </Button>
            </div>
            <Divider />
            <div>
                <div>
                    <p>快报</p>
                    <div><a href='https://new.qq.com/omn/20210730/20210730A000NJ00.html'>明星黑历史的节目</a></div>
                    <div><a href='https://v.qq.com/x/page/u0040x6sagy.html'>夺冠时刻</a></div>
                    <div><a href='https://new.qq.com/omn/20210730/20210730A000NJ00.html'>明星黑历史的节目</a></div>
                    <div><a href='https://v.qq.com/x/page/u0040x6sagy.html'>夺冠时刻</a></div>
                </div>
            </div>
            <Divider />
            <div className={styles.moremodule}>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
                <div>
                    <img src={p6} alt='1' />
                    <span>话费</span>
                </div>
            </div>
        </div>
    )
}

export default Userinfo
