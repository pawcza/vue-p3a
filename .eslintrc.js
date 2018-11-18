module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    rules:{
        "indent": "off"
    },
    plugins: [
        'vue'
    ]
}