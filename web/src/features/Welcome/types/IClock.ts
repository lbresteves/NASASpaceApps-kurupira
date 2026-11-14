// Response of GET /clock.
export interface IClock {
  timezone: string;
  iso: string;
  date: string;
  time: string;
}
