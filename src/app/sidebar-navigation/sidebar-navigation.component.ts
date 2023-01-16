import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.css'],
})
export class SidebarNavigationComponent {
  menuItems = [
    { image: 'user', title: 'Users', url: 'users' },
    { image: 'files', title: 'CMS Page' },
    { image: 'goal', title: 'Mission', url: 'missions' },
    { image: 'grid', title: 'Mission Theme' },
    { image: 'customer-support', title: 'Mission Skills' },
    {
      image: 'folder',
      title: 'Mission Application',
    },
    { image: 'book', title: 'Story', url: 'story-dashboard' },
    { image: 'banner', title: 'Banner-Management' },
  ];
}
