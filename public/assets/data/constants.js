export const TEAM_IDS = Array.from(Array(34), (_, i) => i + 1);

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
  defense: ['Base 3-4 D'],
  specialTeams: ['Special Teams'],
};

export const STARTERS = {
  offense: ['LT1', 'LG1', 'C1', 'RG1', 'RT1'],
  defense: ['NT1', 'LCB1', 'SS1', 'FS1', 'RCB1'],
  offense3WR1TE: ['QB1', 'RB1', 'WR1', 'WR2', 'WR3', 'TE1'],
  defenseBase34D: ['LDE1', 'RDE1', 'SLB1', 'WLB1', 'LILB1', 'RILB1'],
};
