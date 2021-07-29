import { Table } from 'antd'

const Products = () => {
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];
    const procol = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record: any, selected: any, selectedRows: any) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
          console.log(selected, selectedRows, changeRows);
        },
      };
    return (
        <Table
            columns={procol}
            dataSource={dataSource}
            pagination={false}
            rowSelection={{ ...rowSelection }}
            bordered
        />
    )
}

export default Products