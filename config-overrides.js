const {
    addDecoratorsLegacy,
    override,
    fixBabelImports,
    addLessLoader
} = require("customize-cra");
const theme = require("./theme")
module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            }),
    addLessLoader({
            javascriptEnabled: true,
            modifyVars: theme,
            }),
)