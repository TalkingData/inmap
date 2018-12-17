export default interface GeoJSON {
    geometry: {
        type: string,
        coordinates: Array<any>
    },
    name: string
    count: number
}