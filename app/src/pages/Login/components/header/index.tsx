import './index.less'
import { Logo } from '../logo'

const Loginheader = (): JSX.Element => {
    return (
        <div className='loginmainheader'>
            <div className='loginheader'>
                <Logo />
                <div>
                    地大物博
                </div>
            </div>
        </div>
    )
}

export default Loginheader
