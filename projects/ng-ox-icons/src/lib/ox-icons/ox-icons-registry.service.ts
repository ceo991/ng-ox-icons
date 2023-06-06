import { Injectable } from '@angular/core';

import { oxIcons, OxIcons } from 'ox-icons';

@Injectable({
    providedIn: 'any'
})
export class OxIconsRegistry {
    private registry = new Map<oxIcons, string>();

    public registerIcons(icons: OxIcons[]): void {
        icons.forEach((icon: any) => this.registry.set(icon.name, icon.data));
    }

    public getIcon(iconName: oxIcons): string | undefined {
        if (!this.registry.has(iconName)) {
            console.warn(
                `👀 we could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`
            );
        }
        return this.registry.get(iconName);
    }
}
