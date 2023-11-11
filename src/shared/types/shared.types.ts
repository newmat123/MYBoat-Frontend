export type environment_ =
  | {
      temperature?: number;
      heat?: number;
      humidity?: number;
      bilgeStatus?: boolean;
      timestamp?: string;
    }[]
  | undefined;
