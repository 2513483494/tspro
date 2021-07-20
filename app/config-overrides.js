const {
    override,
    fixBabelImports,
    addLessLoader
} = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
        // 这里可以添加less的其他配置
        lessOptions: {
            // 根据自己需要配置即可~
        }
    })
);