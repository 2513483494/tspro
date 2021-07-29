import UserhomeHeader from '../userhomeheader'
import styles from './style.module.less'
import FunctionBar from '../FuncBar'
import PicScroll from '../PicsScroll'

const AdminUser = (): JSX.Element => {
    return (
        <>
            <FunctionBar />
            <UserhomeHeader />
            <div className={styles.userhomebody}>
                <PicScroll />
            </div>
        </>
    )
}

export default AdminUser
