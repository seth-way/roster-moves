export const TEAM_IDS = Array.from(Array(34), (_, i) => i + 1);

export const TEAM_ABBREVS = [
  'ARI',
  'ATL',
  'BAL',
  'BUF',
  'CAR',
  'CHI',
  'CIN',
  'CLE',
  'DAL',
  'DEN',
  'DET',
  'GB',
  'HOU',
  'IND',
  'JAX',
  'KC',
  'LV',
  'LAC',
  'LAR',
  'MIA',
  'MIN',
  'NE',
  'NO',
  'NYG',
  'NYJ',
  'PHI',
  'PIT',
  'SF',
  'SEA',
  'TB',
  'TEN',
  'WSH',
  //'AFC',
  //'NFC',
];

export const YEARS = [];

for (let i = 2020; i < 2024; i += 1) {
  YEARS.shift(i);
}

export const POSITIONS = {
  offense: ['WR', 'LT', 'LG', 'C', 'RG', 'RT', 'QB', 'TE', 'RB'],
  defense: [
    'LDE',
    'NT',
    'RDE',
    'WLB',
    'LILB',
    'RILB',
    'SLB',
    'LCB',
    'SS',
    'FS',
    'RCB',
  ],
  specialTeams: ['PK', 'P', 'H', 'PR', 'KR', 'LS'],
};

export const FORMATIONS = {
  offense: ['3WR 1TE'],
  defense: ['Base 3-4 D', 'Base 4-3 D'],
  specialTeams: ['Special Teams'],
};

export const STARTERS = {
  offense: ['LT1', 'LG1', 'C1', 'RG1', 'RT1'],
  defense: ['NT1', 'LCB1', 'SS1', 'FS1', 'RCB1'],
  offense3WR1TE: ['QB1', 'RB1', 'WR1', 'WR2', 'WR3', 'TE1'],
  defenseBase34D: ['LDE1', 'RDE1', 'SLB1', 'WLB1', 'LILB1', 'RILB1'],
  defenseBase43D: ['LDE1', 'LDT1', 'RDT1', 'RDE1', 'WLB1', 'MLB1', 'SLB1'],
};
