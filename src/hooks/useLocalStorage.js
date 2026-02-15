import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  // Get stored value or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item || initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (valueToStore === null) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, valueToStore)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
