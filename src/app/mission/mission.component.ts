import { Component } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
})
export class MissionComponent {
  missions: any;
  /**
   *
   */
  constructor(private mission: MissionService, private crud: CrudService) {}
  ngOnInit() {
    this.getAllMissions();
  }
  getAllMissions() {
    this.mission.getMissions().subscribe((result) => {
      this.missions = result;
    });
  }

  deleteMission(id: number) {
    this.crud.delete(id).subscribe((result) => {
      this.getAllMissions();
    });
  }
}
