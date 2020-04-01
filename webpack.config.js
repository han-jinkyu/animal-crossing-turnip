const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/scripts/app.js',
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    resolve: {
        alias: {
            // $사인은 정확한 일치를 나타냄. 즉 'vue'라고 불러써야 함.
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            // eslint-disable-next-line no-undef
            template: path.resolve(__dirname, './src/index.html'),
            // eslint-disable-next-line no-undef
            filename: path.resolve(__dirname, './public/index.html'),
            inject: true,
            minify: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
