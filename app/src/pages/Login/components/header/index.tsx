import './index.less'
import { Logo } from '../logo'

const Loginheader = (): JSX.Element => {
    return (
        <div className='loginheader'>
            <Logo />
            <div>
                地大物博
            </div>
        </div>
    )
}

export default Loginheader
