interface StorageProps {
  key: string
  value: unknown
}

export function storeInStorage({ key, value }: StorageProps) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(`Error storing ${key} to localStorage`, error)
  }
}

export function getFromStorage({ key }: Omit<StorageProps, 'value'>) {
  try {
    const value = localStorage.getItem(key)

    if (value) return JSON.parse(value)
  } catch (error) {
    console.log(`Error retrieving ${key} from localStorage`, error)
  }
  return null
}
