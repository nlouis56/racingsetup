export type Setup = {
  id: number
  name: string
  track: string
  description: string
  createdAt: Date
  vehicle: Vehicule
  values: Value[]
}

export type Value = {
  parameterId: number
  values: object
}

export type Vehicule = {
  id: number
  name: string
  description: string
  createdAt: Date
}
