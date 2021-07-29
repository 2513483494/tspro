import styles from './style.module.less'
import { Input } from 'antd'

const { Search } = Input

const CarHead = () => {
    return (
        <div className={styles.mainhead}>
            <img src='https://misc.360buyimg.com/jdf/1.0.0/unit/global-header/5.0.0/i/jdlogo-201708-@2x.png' alt='1' />
            <Search className={styles.search}/>
        </div>
    )
}

export default CarHead
