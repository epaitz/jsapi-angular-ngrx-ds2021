import { Component, OnInit, Input, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { RouteMetadata } from '../../models/route-metadata';
import { RouterService } from '../../services/router.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    public buttons: any[];
    public showButtonsFromRoute = false;
    public isOverflowVisible = false;
    public settingsButton: any;

    @Input() orientation: string;
    @Input() routePath: string;
    @Input() settingsPath: string;
    @Input() routerConfig: RouteMetadata[];

    @Output() sidenavToggle: EventEmitter<string> = new EventEmitter();

    @HostListener('window:resize') onResize(): void {
        this.updateButtonVisibility();
    }

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.showButtonsFromRoute = (this.routePath != null);
        this.initializeButtonsFromRoute();
        this.initializeSettingsButton();
        this.updateButtonVisibility();
    }

    onSidenavToggle(path: string): void {
        this.sidenavToggle.emit(path);
    }

    private initializeButtonsFromRoute(): void {
        if (this.showButtonsFromRoute === false) { return; }
        if (this.routerConfig == null) { return; }

        this.buttons = this.routerConfig
            .find((route: RouteMetadata) => {
                return route.path === this.routePath;
            })
            ?.children
            ?.filter((route: RouteMetadata) => {
                return route.path !== this.settingsPath;
            })
            .map((route: RouteMetadata, index: number) => {
                return {
                    id: index,
                    path: route.fullPath,
                    icon: route.icon,
                    label: route.label,
                    bottom: 48 * (index + 1)
                };
            }) ?? [];
    }

    private initializeSettingsButton(): void {
        if (this.showButtonsFromRoute === false) { return; }
        if (this.routerConfig == null) { return; }

        const settingsRoute = this.routerConfig
            .find((route: any) => {
                return route.path === this.routePath;
            })
            ?.children
            ?.find((route: any) => {
                return route.path === this.settingsPath;
            });

        if (settingsRoute != null) {
            this.settingsButton = {
                path: settingsRoute.path,
                icon: settingsRoute.icon,
                label: settingsRoute.label
            };
        }
    }

    private updateButtonVisibility(): void {
        if (this.showButtonsFromRoute === false) { return; }
        if (this.buttons == null) { return; }

        const height = this.elementRef.nativeElement.getBoundingClientRect().height;

        this.buttons = this.buttons.map((button) => {
            button.visible = button.bottom < height - 100;
            return button;
        });

        this.isOverflowVisible = this.buttons.some((button) => {
            return button.visible === false;
        });
    }
}
