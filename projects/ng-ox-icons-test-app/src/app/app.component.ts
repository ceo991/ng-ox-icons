import { Component }                            from '@angular/core';
import { OxIconsRegistry }                               from 'ng-ox-icons';
import { oxIcons, oxIconsAnchor, oxIconsDotsHorizontal } from 'ox-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-ox-icons-test-app';
  iconName: oxIcons = 'anchor';


  // tslint:disable-next-line:typedef
  color: string = 'green';
  changeIcon() {
    // this.iconName = 'dots_horizontal';
    this.color = 'red';
  }
}
