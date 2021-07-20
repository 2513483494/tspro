const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        // 这里可以添加less的其他配置
        lessOptions: {
            javascriptEnabled: true
        }
    }),
    addWebpackAlias({
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
    })
);