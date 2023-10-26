import Participation from './Participation.model';

export default interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
