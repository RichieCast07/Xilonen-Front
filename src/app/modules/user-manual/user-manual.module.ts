import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualComponent } from './manual/manual.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    ManualComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule
  ]
})
export class UserManualModule { }
