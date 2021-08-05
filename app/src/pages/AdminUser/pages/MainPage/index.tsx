import UserhomeHeader from '../userhomeheader'
import styles from './style.module.less'
import FunctionBar from '../FuncBar'
import PicScroll from '../PicsScroll'
import ScrollBar from '../ScrollBar'
import Brandarea from '../Brandarea'
import { useState } from 'react'
import { addproductToshopcar, getCarProducts } from '@config/index'

const AdminUser = (): JSX.Element => {
    const [carPros, setCarpros] = useState([])
    const getCarPros = (product: any) => {
        addproductToshopcar(product)
        const p = getCarProducts()
        setCarpros(p)
    }

    return (
        <>
            <FunctionBar />
            <UserhomeHeader carPros={carPros} />
            <div className={styles.userhomebody}>
                <PicScroll />
                <Brandarea getCarPros={getCarPros} />
            </div>
            <ScrollBar />

        </>
    )
}

export default AdminUser
