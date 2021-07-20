import './index.less'
import { Logo } from '../logo'

export const Loginheader = (): JSX.Element => {
    return (
        <div className='loginheader'>
            <Logo />
            <div>
                地大物博
            </div>
        </div>
    )
}