## grunt-typescript-using-tsconfig
This is a grunt task that will help you compile your TypeScript projects using the tsconfig.json file.

#### Basic configuration
```js
    typescriptUsingTsConfig: {
      basic: {
        options: {
          rootDir: "./" // optional
        }
      }
```

#### defaultTsConfig
If you don't have a tsconfig.json file in the rootDir, a default tsconfig.json will be created for you. You can also define the defaultTsConfig file:

```js
    typescriptUsingTsConfig: {
      basic: {
        options: {
          rootDir: "./",             // optional
          defaultTsConfig: {         // optional
            "compilerOptions": {
              "target": "es5",
              "module": "commonjs",
              "removeComments": false,
              "declaration": false,
              "sourceMap": false,
              "outDir": "./tmp"
            },
            "filesGlob": [
              "**/*.ts"
            ],
            "files": []
          }
        }
      }
```

#### filesGlob
You can specify a "filesGlob" property in the tsconfig.json file and the task will fill the "files" property automatically before the compilcation.


