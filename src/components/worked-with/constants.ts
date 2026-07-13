export interface Company {
  name: string;
  logo: string;
  url: string;
  /** Skip the brightness/invert filter — use for logos with solid-fill backgrounds */
  noFilter?: boolean;
}

export const COMPANIES: Array<Company> = [
  { name: "Exco Partners", logo: "/company/exco-partners.svg", url: "https://excopartners.com/" },
  {
    name: "Fair Work Commission",
    logo: "/company/fwc.svg",
    url: "https://www.fwc.gov.au/",
  },
  { name: "TAC", logo: "/company/tac.svg", url: "https://howsafeisyourcar.com.au/" },
  {
    name: "Solstice Energy",
    logo: "/company/solstice.svg",
    url: "https://www.solsticeenergy.com.au/",
  },
  {
    name: "Make-A-Wish Australia",
    logo: "/company/make-a-wish.svg",
    url: "https://www.makeawish.org.au/",
  },
  {
    name: "Vicinity Centres",
    logo: "/company/vicinity.png",
    url: "https://www.vicinity.com.au/",
  },
  {
    name: "Amplar Health",
    logo: "/company/amplar.png",
    url: "https://virtualpsychology.amplarhealth.com.au/",
  },
  { name: "Nando's", logo: "/company/nandos.svg", url: "https://www.nandos.com.au/" },
  { name: "inlight", logo: "/company/inlight.svg", url: "https://www.inlight.com.au/" },
  {
    name: "Whitefox Real Estate",
    logo: "/company/whitefox.svg",
    url: "https://www.whitefoxrealestate.com.au/",
  },
  { name: "My Little Tag", logo: "/company/my-little-tag.png", url: "https://mylittletag.com/" },
  {
    name: "Swinburne University",
    logo: "/company/swinburne.svg",
    url: "https://swinburne.edu.au",
  },
];

export interface Stat {
  value: number | null;
  suffix: string;
  label: string;
}

export const STATS: Array<Stat> = [
  { value: 20, suffix: "+", label: "Projects shipped" },
  { value: 6, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "Companies served" },
  { value: null, suffix: "∞", label: "Coffee consumed" },
];
