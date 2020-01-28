module.exports = {
    verbose: true,
    preset: "jest-preset-angular",
    moduleNameMapper: {
      "^@app/(.*)": "<rootDir>/src/app/$1"
    },
    transformIgnorePatterns: [
     '<rootDir>/node_modules/(?!@ngrx|@ionic-native|@ionic)',
     '^.+\\.js$',
     '/node_modules/',
     'index.js',
     '/@ionic-native/',
    ]
    
}