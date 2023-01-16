import { Component, Input } from '@angular/core';
import { missionCard } from '../data-types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() cardData: missionCard = {
    missionId: -1,
    missionName: '',
    missionTitle: '',
    missionDescription: '',
    availableSeats: -1,
    startDate: '',
    deadline: '',
    missionPic: null,
    missionPicUrl: '',
  };
}
