export type environmentByDays_ =
  | {
      temperature?: number;
      heat?: number;
      humidity?: number;
      bilgeStatus?: boolean;
      timestamp?: string;
    }[][]
  | undefined;

export type environment_ =
  | {
      temperature?: number;
      heat?: number;
      humidity?: number;
      bilgeStatus?: boolean;
      timestamp?: string;
    }[]
  | undefined;
