module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import", {
      "libraryName": "at",
      "libraryDirectory": "src/components"
      }
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ["import", {
      "libraryName": "view-design",
      "libraryDirectory": "src/components"
      },
      "view-desion"
    ]
  ]
}
