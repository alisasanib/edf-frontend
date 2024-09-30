export interface Country {
  name: { official: string };
  capital: string | string[];
  flag?: string;
  flags?: {
    png?: string;
    alt?: string;
  };
  region?: string;
  subregion?: string;
  currencies?: {
    [code: string]: CurrencyDetails;
  };
  languages?: {
    [key: string]: string;
  };
}

export interface CurrencyDetails {
  name: string;
  symbol: string;
}
