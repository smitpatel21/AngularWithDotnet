import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { MissionService } from '../services/mission.service';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css'],
})
export class UpdateMissionComponent {
  imagePath: string = '';
  missionId: any;
  constructor(
    private crud: CrudService,
    private mission: MissionService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.missionId = Number(this.router.snapshot.paramMap.get('id'));
    this.getMission(this.missionId);
  }

  missionForm = new FormGroup({
    missionTitle: new FormControl('', [Validators.required]),
    missionName: new FormControl('', [Validators.required]),
    missionDescription: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
    availableSeats: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
  });

  getMission(id: number) {
    this.mission.getMissionById(id).subscribe((result: any) => {
      this.imagePath = result.missionPicUrl;
      this.missionForm.setValue({
        missionTitle: result.missionTitle,
        missionName: result.missionName,
        missionDescription: result.missionDescription,
        availableSeats: result.availableSeats,
        deadline: result.deadline,
        startDate: result.startDate,
      });
    });
  }

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

  get missionStartDate() {
    return this.missionForm.get('startDate');
  }

  imageSelect(e: any) {
    const formData: FormData = new FormData();
    formData.append('image', e.target.files[0], e.target.files[0].name);
    this.crud.uploadMissionImage(formData).subscribe((result: any) => {
      this.imagePath = result.folder;
    });
  }

  updateMission() {
    this.mission
      .updateMission(this.missionId, {
        ...this.missionForm.value,
        missionPicUrl: this.imagePath,
      })
      .subscribe((result) => {});
    this.missionForm.reset();
  }
}
