import SearchFields from './components/search'
import ProductTable from './components/productTable'
import { useState } from 'react'

const Stateproduct = () => {
    const [finds, setFinds] = useState()
    const onChange = (f: any) => {
        setFinds(f)
    }
    return (
        <div>
            <SearchFields onChange={onChange} />
            <ProductTable finds={finds} />
        </div>
    )
}

export default Stateproduct
