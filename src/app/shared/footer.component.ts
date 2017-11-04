import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-footer',
    template: `
    <div class="footer">
         <h1 class="text-center">
         <span>
            <img 
            styles="
            width: 10px;
            height: 125px;
            margin-right: -20px;
            margin-bottom: -15px;" 
            src="assets/images/logo.png" 
            alt="Logo Geocity">
         </span>
     Geocity
</h1>
    </div>
    `,
    styles: [`
        .footer{
            margin: 50px 0px 0px ;
            width: 100%;
            overflow: hidden;
        }
    `]
})
export class FooterComponent { }