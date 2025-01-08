export interface Question {
  label: string;
  anwser: string | number;
  possibleAnswer: string[];
  gamemode: Gamemode.CoverBattle;
}

enum Gamemode {
  CoverBattle = "cover-battle",
}
