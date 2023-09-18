export declare class LocationDto {
    readonly id: string;
    readonly city: string;
    readonly country: string;
    readonly street: string;
    readonly houseNumber: string;
    coordinars: {
        lat: number | null;
        lng: number | null;
    };
}
