export type XorO = 'X' | 'O'

export type PlayerProps = {
  name: string;
  symbol: XorO;
};

export type LeaderboardEntryProps = {
  name: string;
  wins: number;
  losses: number;
};