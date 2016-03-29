## Compile TypeScript projects using tsconfig.json, for GruntJS
grunt-typescript-using-tsconfig is an npm package that compiles TypeScript projects in GruntJS. It's a simple wrapper over tsc command-line compiler, with two simple goals.

* It is using the tsconfig.json to configure your project setup. (Comes with a default tsconfig.json)
* Supporting filesGlob, so you wont have to update the "file" property every time you add/delete/rename ts files.
- - - -

#### Basic configuration
```js
    typescriptUsingTsConfig: {
      basic: {
        options: {
          rootPath: "./" // optional
        }
      }
    }
```

#### defaultTsConfig
If you don't have a tsconfig.json file in the rootPath, a default tsconfig.json will be created for you. You can also define the defaultTsConfig file:

```js
    typescriptUsingTsConfig: {
      basic: {
        options: {
          rootPath: "./",             // optional
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
    }
```

#### filesGlob
You can specify a "filesGlob" property in the tsconfig.json file and the task will fill the "files" property automatically before the compilcation.


