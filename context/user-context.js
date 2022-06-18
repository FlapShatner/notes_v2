import { createContext, useContext, useMemo, useReducer } from 'react'

export const UserContext = createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'setUserName':
      return {
        ...state,
        userName: action.payload,
      }
    default:
      return state
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { userName: '' })
  const value = { state, dispatch }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
