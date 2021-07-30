import UserhomeHeader from '../userhomeheader'
import styles from './style.module.less'
import FunctionBar from '../FuncBar'
import PicScroll from '../PicsScroll'
import ScrollBar from '../ScrollBar'
import Brandarea from '../Brandarea'

const AdminUser = (): JSX.Element => {
    return (
        <>
            <FunctionBar />
            <UserhomeHeader />
            <div className={styles.userhomebody}>
                <PicScroll />
                <Brandarea />
            </div>
            <ScrollBar />
            
        </>
    )
}

export default AdminUser
