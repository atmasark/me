import { ReactNode, Dispatch } from 'react'

export type ProviderProps = {
  children: ReactNode
}

export type ContextProps = {
  state: State
  dispatch: Dispatch<Action>
}

export type Message = {
  user: boolean
  isVisible: boolean
  content: string
  delay?: number
}

export type Question = {
  key: string
  content: string
  answers: string[]
}

export type State = {
  isLoading: boolean
  messages: Message[]
  questions: Question[]
}

export type Action =
  | {
      type: 'SHOW_MESSAGE'
      index: number
    }
  | {
      type: 'ADD_MESSAGE'
      key: string
      content: string
      answers: string[]
      delay?: number
    }
  | {
      type: 'SET_READY'
    }
