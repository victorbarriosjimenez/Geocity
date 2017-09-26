import { Component } from '@angular/core';
@Component({
  selector: 'not-found',
  template:  `
    <div class="error"> 
        <h1>Error 404</h1>
        <h2 class="face"> ¯&#92;_(ツ)_/¯</h2>
    </div>
  `,
  styles: [
    ` 
      body { height: 100%; width: 100%; }
      .error { display: flex; justify-content: center; align-items: center; flex-direction: column; } 
      .face { font-size: 6em; }
    `
  ]
})
export class NotFoundComponent { }
