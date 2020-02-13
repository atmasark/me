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
      content: "I'm Atte's.. agent",
    },
    {
      user: false,
      isVisible: false,
      content:
        "If you want to talk to real me, hit me up at <a href='mailto:atte@gnonce.com'>atte@gnonce.com</a>",
    },
    {
      user: false,
      isVisible: false,
      content:
        "I can also be found from: <br> <a href='https://linkedin.com/in/atmasark'>linkedin.com/in/atmasark</a> <br/><a href='https://github.com/atmasark'>github.com/atmasark</a>",
    },
    {
      user: false,
      isVisible: false,
      content: 'Have a nice day! Or would you have wanted to know more?',
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
      key: 'experience',
      content: 'Work experience, shortly. Go!',
      answers: [
        'Worked in various academic research groups at University of Jyväskylä for a year during my studies',
        'Co-founded Gnonce in late 2018, self-employing ourselves by working as a subcontractor for publicly listed companies and participating in joint ventures',
        'More in-depth explanations in my LinkedIn',
      ],
    },
    {
      key: 'contact',
      content: 'How can I contact you, again?',
      answers: [
        "As a paranoid human being I really don't feel comfortable sharing my phone number out here",
        "Anyway, you can still get in contact with me via LinkedIn: <a href='https://linkedin.com/in/atmasark'>linkedin.com/in/atmasark</a>",
        "You can also email me at <a href='mailto:atte@gnonce.com'>atte@gnonce.com</a>",
      ],
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
