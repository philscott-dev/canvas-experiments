import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPosts: concatPagination(),
        todos: {
          read() {
            return todosVar()
          },
        },
      },
    },
  },
})

interface Todo {
  id: string
  text: string
}

export const todosVar: ReactiveVar<Todo[]> = makeVar<Todo[]>([
  {
    id: '1',
    text: 'sup',
  },
])
