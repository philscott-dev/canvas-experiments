# flow-automation-client

### TypeScript 
1. Ensure you're using the Apollo GraphQL extension for VS Code
2. `npm run dev` will automatically grab the schema and type from the server
3. While developing you may want to periodically run `npm run apollo` if your backend server is being actively updated / deployed
4. After a type/schema update, ensure you run `Cmd + Shift + P` to bring up the command palette, and run the `Apollo: Reload Schema` command.


#### To Do:
Fix the Pivot Queue Mutations. The types are gross and feel like they might be bug prone 