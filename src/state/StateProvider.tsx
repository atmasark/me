import React, { createContext, useReducer } from 'react'
import { State, Action, ContextProps, ProviderProps } from './types'

const initialState = {
  isLoading: true,
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
  questions: [
    {
      key: 'occupation',
      content: 'What do you do?',
      answers: [
        "Don't really like fancy titles",
        'But I like to code',
        'And I mostly do web stuff, both back- and frontend',
        'So I guess that makes me a full stack developer :)',
      ],
    },
    {
      key: 'contact',
      content: 'How can I contact you?',
      answers: [
        "As a paranoid human being I really don't feel comfortable sharing my phone number out here",
        'Anyway, you can still get in contact with me via LinkedIn: https://linkedin.com/in/atte-sarkonen',
        'You can also email me at atte@gnonce.com',
      ],
    },
    {
      key: 'meaningOfLife',
      content: "What's the meaning of life?",
      answers: ['To be alive'],
    },
  ],
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {
        ...state,
        isLoading: true,
        messages: state.messages.map((msg, i) => {
          if (i === action.index) {
            return { ...msg, isVisible: true }
          }
          return msg
        }),
      }
    case 'ADD_MESSAGE':
      return {
        isLoading: true,
        messages: [
          ...state.messages,
          { user: true, isVisible: true, content: action.content },
          ...action.answers.map(answer => ({
            user: false,
            isVisible: false,
            content: answer,
          })),
        ],
        questions: state.questions.filter(answer => answer.key !== action.key),
      }
    case 'SET_READY':
      return {
        ...state,
        isLoading: false,
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
