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
}

export type State = {
  messages: Message[]
}

export type Action = {
  type: 'SHOW_MESSAGE'
  index: number
}
