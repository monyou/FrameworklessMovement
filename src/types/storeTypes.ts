export type Theme = 'light' | 'dark';

export type User = {
    email: string;
    firstName: string;
    gpsCoordinates: [number, number] | null;
    online: boolean;
}