import UserhomeHeader from '../userhomeheader'
import styles from './style.module.less'
import FunctionBar from '../FuncBar'

const AdminUser = (): JSX.Element => {
    return (
        <>
            <FunctionBar />
            <UserhomeHeader />
            <div className={styles.userhomebody}>


            </div>
        </>
    )
}

export default AdminUser
