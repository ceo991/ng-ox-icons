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
    @Input() height: string | undefined ;
    @Input() width: string | undefined ;
    iconNameText: string | oxIcons = '';
    iconClass: string;

    @Input()
    set name(iconName: oxIcons) {
      if (iconName) {
        this.iconNameText = iconName;
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

    constructor(private readonly element: ElementRef,
                private readonly oxIconsRegistry: OxIconsRegistry,
                private readonly renderer: Renderer2,
                @Optional() @Inject(DOCUMENT) private readonly document: any) {
      this.iconClass = `ox-icon_${uuidv4()}`;
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

    ngOnChanges(changes: SimpleChanges): void {
      if (changes.name?.currentValue){
        if (this.svgIcon) {
          this.element.nativeElement.removeChild(this.svgIcon);
        }
        const svgData = this.oxIconsRegistry.getIcon(changes.name?.currentValue.trim());
        if (svgData) {
          this.svgIcon = this.svgElementFromString(svgData);
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      } else {
        if (this.document.querySelector(`.${this.iconClass}`)){
          if (changes?.width && changes?.height){
            this.changeSize(this.document.querySelector(`.${this.iconClass}`),  changes?.width.currentValue, changes?.height.currentValue);
          }else if (changes?.width){
            this.changeSize(this.document.querySelector(`.${this.iconClass}`),  changes?.width.currentValue, changes?.width.currentValue);
          }else if (changes?.height){
            this.changeSize(this.document.querySelector(`.${this.iconClass}`),  changes?.height.currentValue, changes?.height.currentValue);
          }
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
          this.svgIcon = this.svgElementFromString(svgData);
          this.element.nativeElement.appendChild(this.svgIcon);
        }
      }
    }

  // tslint:disable-next-line:typedef

  private svgElementFromString(svgContent: string): SVGElement {
        const div = this.document.createElement('DIV');
        div.innerHTML = svgContent;
        this.renderer.addClass(div.querySelector('svg'), this.iconClass);
        if (this.width && this.height){
          this.changeSize(div.querySelector(`.${this.iconClass}`),  this.width, this.height);
        }else if (this.width){
          this.changeSize(div.querySelector(`.${this.iconClass}`),  this.width, this.width);
        }else if (this.height){
          this.changeSize(div.querySelector(`.${this.iconClass}`),  this.height, this.height);
        }
        return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
    }

  // tslint:disable-next-line:typedef
  changeSize(element: any, width?: string | undefined, height?: string | undefined){
    if (typeof width === 'string') {
      this.renderer?.setStyle(element, 'width', width);
    }
    if (typeof height === 'string') {
      this.renderer?.setStyle(element, 'height', height);
    }
  }
}
