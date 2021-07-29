import './index.less'

const Count = (props: any) => {
    const { count } = props
    return (
        <span className='shopcarcount'><span className='shopcarcounttext'>{count}</span></span>
    )
}

export default Count
