import { PlayingCard } from "../cards/playingCard"

export interface Player {
    id: string
    type: 'pending' | 'computer' | 'authenticated' | 'guest'
    username: string
    email?: string
    guestId?: string
    color: string,
    cards?: PlayingCard[]
}
