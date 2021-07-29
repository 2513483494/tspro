import p1 from './imgs/1.webp'
import p2 from './imgs/2.webp'
import p3 from './imgs/3.jpeg'
import p4 from './imgs/4.webp'
import styles from './style.module.less'

const PicScroll = () => {
    return (
        <div className={styles.picscroll}>
            <img src={p1} alt='1' />
        </div>
    )
}

export default PicScroll
