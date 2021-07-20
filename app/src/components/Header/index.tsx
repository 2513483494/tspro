import './index.less'
import { formatTime } from '../../config'
import { useState } from 'react'
import Logout from './components/logout'
import {Divider} from 'antd'

const Header = () => {
    const [t, sett] = useState<string>()
    setInterval(() => {
        const currt = formatTime(Date.now())
        sett(currt)
    }, 1000)

    return (
        <div className='header'>
            <div className='logout'>
                <Logout />
            </div>
            <span>{t}</span>
            <Divider/>
        </div>
    )
}

export default Header
