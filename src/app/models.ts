export interface Fang {
    FangID: number;
    UserID: number;
    FangDatum?: Date;
    NymphenName: string;
    NymphenFarbe: string;
    Hackengroesse?: number;
    Koepfchen: string;
    GewaesserName: string;
    TiefeStandort?: number;
    TiefeFischFang?: number;
    WasserTemperatur?: number;
    Wetter: string;
    Luftdruck?: number;
    Windgeschwindigkeit?: number;
    LuftTemperatur?: number;
    AllowPublic: boolean;
}
export interface LoginUser {
    id: string;
    access_token: string;
}
export interface User {
     UserID: number;
     FirstName: string;
     LastName: string;
     Email: string;
     Password: string;
     IsActive: boolean;
 }
