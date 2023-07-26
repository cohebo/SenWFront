export interface Game {
    gameId: number;
    name: string;
    image: string;
    title?: string;
    description?: string;
    state?: boolean;
    count?: number;
}