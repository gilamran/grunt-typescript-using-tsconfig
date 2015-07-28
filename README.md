# grunt-typescript-using-tsconfig
This is a grunt task that will help you compile your TypeScript projects using the tsconfig.json file.

If you don't provide a tsconfig.json file a default tsconfig.json will be created for you.

You can specify a "filesGlob" property in the tsconfig.json file and the task will fill the "files" property automatically before the compilcation.
