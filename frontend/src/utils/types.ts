export type Setup = {
    id: number
    name: string
    track: string
    vehicle: {
      id: number
      name: string
      type: string
      description: string
    }
    user: {
      id: number
      displayName: string
      team: string | null
    }
    parameters: Array<{
      section: string // Ex: 'Front Right', 'Rear Left'
      settings: Array<{
        name: string
        value: string
      }>
    }>
    weather: string
    date: string
    comments: string
  }
  