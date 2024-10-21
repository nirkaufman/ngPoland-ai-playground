import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl">HIRE POWER</a>
      </div>
      <div class="navbar-center lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a [routerLink]="['/chat']" >Chat</a></li>
          <li><a [routerLink]="['/search']" >Search</a></li>
          <li><a [routerLink]="['/upload']" >Upload</a></li>
          <li><a [routerLink]="['/explore']" >Explore</a></li>
          <li><a [routerLink]="['/tools']" >Tools</a></li>
        </ul>
      </div>
    </div>
  `
})
export class NavbarComponent {}
