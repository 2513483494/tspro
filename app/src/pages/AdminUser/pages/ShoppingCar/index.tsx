import CarHead from './components/CarHead'
import CarFoot from './components/CarFoot'
import Products from './components/Products'
import styles from './style.module.less'

const ShoppingCar = () => {
    return (
        <div className={styles.carbody}>
            <CarHead />
            <Products />
            <CarFoot />
        </div>
    )
}

export default ShoppingCar
