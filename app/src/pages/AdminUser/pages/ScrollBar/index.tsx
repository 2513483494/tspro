import styles from './style.module.less'
import { Button, Divider, BackTop } from 'antd'

const ScrollBar = () => {
    return (
        <div className={styles.scrollbar}>
            <Button type='link'>秒杀</Button>
            <Divider />
            <Button type='link'>特色</Button>
            <Divider />
            <Button type='link'>客服</Button>
            <Divider />
            <Button type='link'>售后</Button>
            <Divider />
            <BackTop visibilityHeight={100} />
        </div>
    )
}

export default ScrollBar
