# flow-automation-client

## TypeScript

1. Ensure you're using the Apollo GraphQL extension for VS Code
2. `npm run dev` will automatically grab the schema and type from the server
3. While developing you may want to periodically run `npm run apollo` if your backend server is being actively updated / deployed
4. After a type/schema update, ensure you run `Cmd + Shift + P` to bring up the command palette, and run the `Apollo: Reload Schema` command.

## PivotQueue Structure

```
const pivotQueue = {
  parent1: {
    child1: ['value1', 'value2', 'value3'],
    child2: ['value1', 'value2', 'value3'],
  },
  parent2: {
    child1: ['value1', 'value2', 'value3'],
    child2: ['value1', 'value2', 'value3'],
  }
}
```

- Why is the data structured this way?

1. A child could have multiple parents, and in order to keep the data grouped as the user inteneded, we build a nested structure to keep values accessible only from the parent they came from. 

2. If a child was not nested under a parent, the array of values would bleed together and we wouldnt be able to tell  where the value came from, unless we iterated over a potentially large array of "value objects" with parentIds, but this could become an expensive operation.

## PivotData Structure

```
const pivotData = {
  parent1: {
    child1: {
      value1?: any,
      value2?: any,
      value3?: any
    },
    child2: {
      value1?: any,
      value2?: any,
      value3?: any
    }
  }
}
```
- Why are we breaking out the PivotData from the PivotQueue?
1. Responses from APIs are unpredictable/unstructured, we're unable to query for them with GQL properly.
2. PivotData will most likely remain cached in the client, and be removed from memory upon reload.
3. We may potentially save the structured PivotQueue on the server side, allowing for new client side PivotData per use. 


#### To Do:
Fix the Pivot Queue Mutations. The types are gross and feel like they might be bug prone
```
