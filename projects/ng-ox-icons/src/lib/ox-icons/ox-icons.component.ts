import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input, OnChanges,
  OnInit,
  Optional, SimpleChanges,
  ViewChild
} from '@angular/core';
// tslint:disable-next-line:import-spacing
import { DOCUMENT }                                                                                   from '@angular/common';
import { oxIcons, OxIcons } from 'ox-icons';

import { OxIconsRegistry } from './ox-icons-registry.service';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'ox-icon',
    template: `
      <span #text style="display: none">
        <ng-content></ng-content>
      </span>
    `,
    styles: [':host::ng-deep svg{width: 20px; height: 20px}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OxIconsComponent implements AfterViewInit {
    private svgIcon: SVGElement | undefined | string = undefined;
    @ViewChild('text') icon: ElementRef | undefined ;
    @Input() svgStrokeColor: string | undefined = '#5F5C5C' ;

    @Input()
    set name(iconName: oxIcons) {
      if (iconName) {
        if (this.svgIcon) {
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(iconName);
        if (svgData) {
            this.svgIcon = this.svgElementFromString(svgData);
            this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

    constructor(private element: ElementRef,
                private readonly oxIconsRegistry: OxIconsRegistry,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    ngAfterViewInit(): void{
      if (this.icon?.nativeElement.textContent.trim() !== ''){
        if (this.svgIcon) {
          this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(this.icon?.nativeElement.textContent.trim());
        if (svgData) {
          this.svgIcon = this.svgElementFromString(svgData);
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

  // tslint:disable-next-line:typedef

  private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}
