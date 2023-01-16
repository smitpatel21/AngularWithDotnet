import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css'],
})
export class AddMissionComponent {
  imagePath: string = '';
  /**
   *
   */
  constructor(private mission: MissionService, private crud: CrudService) {}

  missionForm = new FormGroup({
    missionTitle: new FormControl('', [Validators.required]),
    missionName: new FormControl('', [Validators.required]),
    missionDescription: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
    availableSeats: new FormControl('', [Validators.required]),
  });

  get missionTitle() {
    return this.missionForm.get('missionTitle');
  }

  get missionName() {
    return this.missionForm.get('missionName');
  }

  get missionDescription() {
    return this.missionForm.get('missionDescription');
  }

  get availableSeats() {
    return this.missionForm.get('availableSeats');
  }

  get missionDeadline() {
    return this.missionForm.get('deadline');
  }

  imageSelect(e: any) {
    const formData: FormData = new FormData();
    formData.append('image', e.target.files[0], e.target.files[0].name);
    this.crud.uploadMissionImage(formData).subscribe((result: any) => {
      this.imagePath = result.folder;
    });
  }

  addMission() {
    this.mission
      .addMission({ ...this.missionForm.value, missionPicUrl: this.imagePath })
      .subscribe((result) => {});
    this.missionForm.reset();
  }
}
