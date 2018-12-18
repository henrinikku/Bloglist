module.exports = {
  "extends": [
    "airbnb"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "linebreak-style": 0,
    "no-alert": 0,
    "no-case-declarations": 0,
    "no-underscore-dangle": 0,
    "react/no-access-state-in-setstate": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/destructuring-assignment": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/button-has-type": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
  }
};