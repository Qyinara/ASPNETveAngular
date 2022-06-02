import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  dialogBaslik: string;
  dialogMesaj: string;
  dialogIslem: boolean;
  constructor(
    public dialogRef:MatDialogRef<AlertDialogComponent>
  ) { }

  ngOnInit() { 
  }

}
