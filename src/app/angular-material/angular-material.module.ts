import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkListboxModule } from '@angular/cdk/listbox';

@NgModule({
  declarations: [],
  imports: [
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    CdkListboxModule,
  ],
  exports: [
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    CdkListboxModule,
  ],
})
export class AngularMaterialModule {}
