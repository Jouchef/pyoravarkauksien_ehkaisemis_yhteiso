import { LatLng } from "leaflet"

export interface Coordinate {
  id: number
  lat: number
  lng: number
}

export interface Pin {
  id: number
  coordinate: Coordinate
}

export interface BikeTheft extends Pin {
  description?: string
}

export interface LockStation {
  id: number
  coordinate: Coordinate
}

export interface PinsProps {
  pinData: Coordinate[]
  isChecked: boolean
  typeOfPin: string
  deletePin: (id: number) => void
}

export interface TheftMarkerProps {
  reportMode: boolean
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
}

export interface Filter {
  isChecked: boolean
  label: string
}

export interface Filters {
  [key: string]: Filter
}

export interface PinFilterProps {
  filters: Filters,
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface PinFilterOptionProps {
  name: string
  isChecked: boolean
  label: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface MousePositionControlProps {
  setCursorPosition: (position: { lat: number; lng: number }) => void;
}

export interface MapProps {
  reportMode: boolean
  filters: Filters
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
  bikeThefts: BikeTheft[]
  setBikeThefts: React.Dispatch<React.SetStateAction<BikeTheft[]>>
}

export interface ReportModalProps {
  theftPosition: LatLng | null
  setTheftPosition: React.Dispatch<React.SetStateAction<LatLng | null>>
  setBikeThefts: React.Dispatch<React.SetStateAction<BikeTheft[]>>
  bikeThefts: BikeTheft[]
}