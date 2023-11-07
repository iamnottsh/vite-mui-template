import {useState} from 'react'

export default function useOpen(): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(false)
  return [open, () => setOpen(true), () => setOpen(false)]
}
