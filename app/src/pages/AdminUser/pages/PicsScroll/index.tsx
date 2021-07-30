import p1 from './imgs/1.webp'
import p2 from './imgs/2.webp'
import p3 from './imgs/3.jpeg'
import p4 from './imgs/4.jpeg'
import styles from './style.module.less'
import { Carousel, Button } from 'antd';
import Userinfo from './Userinfo'

const PicScroll = () => {
    return (
        <div className={styles.picrow}>
            <div className={styles.links}>
                <div>
                    <Button type='link'>家用电器</Button>
                </div>
                <div>
                    <Button type='link'>手机</Button>
                    <Button type='link'>数码</Button>
                </div>
                <div>
                    <Button type='link'>美妆</Button>
                    <Button type='link'>护理</Button>
                </div>
                <div>
                    <Button type='link'>男装</Button>
                    <Button type='link'>女装</Button>
                    <Button type='link'>童装</Button>
                </div>
                <div>
                    <Button type='link'>房产</Button>
                    <Button type='link'>汽车</Button>
                    <Button type='link'>汽车用品</Button>
                </div>
                <div>
                    <Button type='link'>视频</Button>
                    <Button type='link'>酒类</Button>
                    <Button type='link'>生鲜</Button>
                    <Button type='link'>特产</Button>
                </div>
                <div>
                    <Button type='link'>机票</Button>
                    <Button type='link'>酒店</Button>
                    <Button type='link'>旅游</Button>
                    <Button type='link'>生活</Button>
                </div>
                <div>
                    <Button type='link'>安装</Button>
                    <Button type='link'>维修</Button>
                    <Button type='link'>清理</Button>
                    <Button type='link'>二手</Button>
                </div>
                <div>
                    <Button type='link'>理财</Button>
                    <Button type='link'>众筹</Button>
                    <Button type='link'>白条</Button>
                </div>
                <div>
                    <Button type='link'>工业品</Button>
                </div>
                <div>
                    <Button type='link'>母婴</Button>
                    <Button type='link'>母婴</Button>
                    <Button type='link'>乐器</Button>
                </div>
            </div>
            <div className={styles.pics}>
                <Carousel autoplay>
                    <div>
                        <Button><img src={p1} alt='1' /></Button>
                    </div>
                    <div>
                        <Button><img src={p2} alt='1' /></Button>
                    </div>
                    <div>
                        <Button><img src={p3} alt='1' /></Button>
                    </div>
                    <div>
                        <Button><img src={p4} alt='1' /></Button>
                    </div>
                </Carousel >
            </div>
            <div className={styles.userinfo}>
                <Userinfo />
            </div>
        </div >
    )
}

export default PicScroll
