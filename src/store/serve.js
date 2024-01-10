import { create } from 'zustand'

export const useServeStore = create((set) => ({
  serveCode: '',
  setServeCode: (val) => set(() => ({
    serveCode: val
  }))
}))