import React, { createContext, useReducer } from 'react'
import { State, Action, ContextProps, ProviderProps } from './types'

const initialState = {
  messages: [
    {
      user: false,
      isVisible: false,
      content: 'Hello there!',
    },
    {
      user: false,
      isVisible: false,
      content: "I'm Atte",
    },
    {
      user: false,
      isVisible: false,
      content: 'Wonder how you got here..',
    },
    {
      user: false,
      isVisible: false,
      content: "Anyway, what'cha want?",
    },
  ],
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {
        messages: state.messages.map((msg, i) => {
          if (i === action.index) {
            return { ...msg, isVisible: true }
          }
          return msg
        }),
      }
    default:
      throw new Error()
  }
}

export const StateContext = createContext({} as ContextProps)

export const StateProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
