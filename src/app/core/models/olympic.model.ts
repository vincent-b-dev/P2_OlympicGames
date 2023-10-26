import Participation from './participation.model';

export default interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
