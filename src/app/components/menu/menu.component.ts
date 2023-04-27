import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  activeItem: string;
  constructor(private router: Router) {}

  ngOnInit() {}

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/login');
  }

  showMenu(): boolean {
    return this.router.url !== '/login';
  }
}
