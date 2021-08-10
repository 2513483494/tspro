import CarHead from './components/CarHead'
import CarFoot from './components/CarFoot'
import Products from './components/Products'
import styles from './style.module.less'
import { useState } from 'react'

const ShoppingCar = () => {
    const [price, setPrice] = useState()
    return (
        <div className={styles.carbody}>
            <CarHead />
            <Products getAllprice={(price: any) => { setPrice(price) }} />
            <CarFoot price={price}/>
        </div>
    )
}

export default ShoppingCar
