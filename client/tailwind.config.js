const { extend } = require("lodash");

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
    colors: {
    spruceGreen: '#103930',
    spruceDarkGreen: '#092b25',
    spruceTeal: '#227858',
    spruceGreenFoam: '#79db8e',
    },
  },
}
}
