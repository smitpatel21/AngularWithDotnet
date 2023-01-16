import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css'],
})
export class AddSkillsComponent {
  skills: any[] = [];
  userId: string = '';
  skillList = [
    'Anthropology',
    'Archeology',
    'Astronomy',
    'Computer Science',
    'Environmental Science',
    'History',
  ];

  skillsToAdd: any[] = [];
  addedSkills: any[] = [];

  constructor(public dialog: MatDialog, private crud: CrudService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.userId = user && JSON.parse(user).id;
    let userSkills = user && JSON.parse(user).skills;
    this.addedSkills = _.map(userSkills, (e) => {
      return e.name;
    });
    this.skillsToAdd = _.filter(this.skillList, (el) => {
      return !_.includes(this.addedSkills, el);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  cancelSkill() {
    this.skills = [];
    this.dialog.closeAll();
  }

  saveSkills() {
    const x = document.getElementsByClassName('added-skills');
    let set = new Set();
    for (let i = 0; i < x.length; i++) {
      if (x[i].innerHTML !== '') set.add(_.trim(x[i].innerHTML));
      this.skills.forEach((el) => {
        set.add(_.trim(el));
      });
    }
    this.crud.userSkills.next(set as any);
    this.dialog.closeAll();
  }
}
