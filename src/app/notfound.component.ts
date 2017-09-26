import { Component } from '@angular/core';
@Component({
  selector: 'not-found',
  template:  `
    <header>
        <p class="face text-center"> ¯&#92;_(ツ)_/¯</p>
        <h2 class="not-found text-center">Error 404</h2>
        <h1 class="text-center">
        <span>
            <img class="logo-main" src="assets/images/logo.png" alt="Logo Geocity">
        </span>
            Geocity
        </h1>
    </header>
  `,
  styles: [
    ` 
    h1 {
        font-family: 'jaapokkiregularregular';
        font-size: 3em;
    }
    .not-found { 
        font-family: 'jaapokkiregularregular';
        font-size: 6em;
    }
    .logo-main {
       width: 75px;
       height: 75px;
       margin-right: -25px;
    }
    .register-invitation {
       color: darkgrey;
       font-size: 1em;
    }
    .face { font-size: 6em; }
    `
  ]
})
export class NotFoundComponent { }
