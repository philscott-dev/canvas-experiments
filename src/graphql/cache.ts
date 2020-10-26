import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client'

export default new InMemoryCache({})

interface Todo {
  id: string
  text: string
}
