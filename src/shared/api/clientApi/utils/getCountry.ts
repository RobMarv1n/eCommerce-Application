import { Country } from 'postal-code-validator';

export function getCountry(countryName: string): Country {
  const entries = Object.entries(Country);
  const country = entries.find((s) => s[0] === countryName);
  if (country) return country[1];
  return Country.Russia;
}
