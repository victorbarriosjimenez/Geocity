import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'button-upper',
  templateUrl: './button-upper.component.html',
  styleUrls: ['./button-upper.component.css']
})
export class ButtonUpperComponent implements OnInit {

  constructor(private _router:  Router) { }
  ngOnInit() { }
  createNewMatch( ): void { 
    this._router.navigate(['/gameplay']);
  }
}