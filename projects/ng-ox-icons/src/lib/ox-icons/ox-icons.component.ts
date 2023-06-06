import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DOCUMENT }                                                                                   from '@angular/common';
import { oxIcons, OxIcons } from 'ox-icons';

import { OxIconsRegistry } from './ox-icons-registry.service';

@Component({
    selector: 'ox-icons',
    template: `
      <span #text style="display: none">
        <ng-content></ng-content>
      </span>
    `,
    styles: [':host::ng-deep svg{width: 20px; height: 20px}'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OxIconsComponent implements  OnInit{
    private svgIcon: SVGElement | undefined;
    @ViewChild('text') icon: ElementRef | undefined ;
    @Input()
    set name(iconName: oxIcons) {
        if (this.svgIcon) {
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(iconName);

        if (svgData) {
            this.svgIcon = this.svgElementFromString(svgData);
            this.element.nativeElement.appendChild(this.svgIcon);
        }
    }

    constructor(private element: ElementRef, private oxIconsRegistry: OxIconsRegistry,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit(): void {
      if (!this.icon){
        return;
      }
      this.name = this.icon.nativeElement.textContent.trim();
      if (this.svgIcon) {
        this.element.nativeElement.removeChild(this.svgIcon);
      }
      const svgData = this.oxIconsRegistry.getIcon(this.name);
      if (svgData) {
        this.svgIcon = this.svgElementFromString(svgData);
        this.element.nativeElement.appendChild(this.svgIcon);
      }
    }

  private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }
}
