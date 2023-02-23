export interface Languages{
    name:string
  }

  export interface Currencies{
    name:string
  }

 export type Domain=string[];

export interface Data {
    name: string;
    capital: string;
    population: number;
    region:string;
    flag:string; 
    nativeName?:string,
    subregion?:string,
    currencies?:Currencies[],
    languages?:Languages[],
    topLevelDomain?:Domain,
  }[]

 