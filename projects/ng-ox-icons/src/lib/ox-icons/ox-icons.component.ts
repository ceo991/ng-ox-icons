import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input, OnChanges,
  OnInit,
  Optional, Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
// tslint:disable-next-line:import-spacing
import { DOCUMENT }                                                                                   from '@angular/common';
import { oxIcons, OxIcons } from 'ox-icons';

import { OxIconsRegistry } from './ox-icons-registry.service';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'ox-icon',
    template: `
      <span #text [hidden]="true">
        <ng-content></ng-content>
      </span>
    `,
    styles: [':host::ng-deep svg{width: 20px; height: 20px}'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxIconsComponent implements AfterViewInit, OnChanges, AfterViewChecked {
    private svgIcon: SVGElement | undefined | string = undefined;
    @ViewChild('text') icon: ElementRef | undefined ;
    @Input() svgStrokeColor = '#5F5C5C';
    iconNameText: string | oxIcons = '';
    iconClass: string;

    @Input()
    set name(iconName: oxIcons) {
      // console.log(iconName);
      // console.log('color', this.svgStrokeColor);
      if (iconName) {
        this.iconNameText = iconName;
        if (this.svgIcon) {
            this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(iconName);
        if (svgData) {

            this.svgIcon = this.svgElementFromString(svgData, this.svgStrokeColor);
            this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

    constructor(private element: ElementRef,
                private readonly oxIconsRegistry: OxIconsRegistry,
                private readonly renderer: Renderer2,
                @Optional() @Inject(DOCUMENT) private document: any) {
      this.iconClass = `ox-icon_${uuidv4()}`;
    }

    ngAfterViewInit(): void{
      // console.log(this.name);
      if (this.icon?.nativeElement.textContent.trim() !== ''){
        // this.name = this.icon?.nativeElement.textContent.trim();
        if (this.svgIcon) {
          this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(this.icon?.nativeElement.textContent.trim());
        if (svgData) {
          this.svgIcon = this.svgElementFromString(svgData, this.svgStrokeColor);
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

    ngOnChanges(changes: SimpleChanges): void {
      // console.log(this.element.nativeElement);
      // console.log(changes);
      // console.log(changes.name?.currentValue);
      // console.log(changes.name?.currentValue);
      if (changes.name?.currentValue){
        if (this.svgIcon) {
          this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(changes.name?.currentValue.trim());
        if (svgData) {
          this.svgIcon = this.svgElementFromString(svgData, changes.svgStrokeColor?.currentValue);
          // this.svgIcon.children[1].setAttribute('stroke', 'blue');

          // this.renderer.setAttribute( this.svgIcon.children[1], 'stroke', 'blue');
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      } else {
        // console.log( changes.svgStrokeColor?.currentValue);
        if (this.document.querySelector(`.${this.iconClass}`)){
          // console.log(this.document.querySelector(`.${this.iconClass}`));
          //  let childrenArray = Array.from(this.document.querySelector(`.${this.iconClass}`).children);
          // childrenArray.map(x => {
          //   console.log((x as HTMLElement).nodeName);
          // });
          this.changeColor(this.document.querySelector(`.${this.iconClass}`).children[1], changes.svgStrokeColor?.currentValue);
        }
      }
    }

    ngAfterViewChecked(): void {
      if (this.icon?.nativeElement.textContent.trim()){
        if (this.svgIcon !== '') {
          this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(this.icon?.nativeElement.textContent.trim());
        if (svgData) {
          this.svgIcon = this.svgElementFromString(svgData, this.svgStrokeColor);
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

  // tslint:disable-next-line:typedef

  private svgElementFromString(svgContent: string, color?: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        this.changeColor(div.querySelector('svg').children[1],  color);
        this.renderer.addClass(div.querySelector('svg'), this.iconClass);
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }

  // tslint:disable-next-line:typedef
  changeColor(element: any, strokeColor: string | undefined){
      if (typeof strokeColor === 'string') {
        this.renderer?.setAttribute(element, 'stroke', strokeColor);
      }
  }
}
