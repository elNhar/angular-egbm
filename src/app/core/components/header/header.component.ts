import { Component, Input, OnInit } from '@angular/core';
import { Location, LocationStrategy, ViewportScroller } from '@angular/common';
import { HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    hideMenu: boolean = true;
    isHomePage: boolean = true;

    constructor(
        private scroll: ViewportScroller,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const navigation = window.document.getElementById('navigation');
        let top = this.scroll.getScrollPosition();
        if (navigation) {
            if (top[1] < 10) {
                if (!this.isRecurso() || !this.isHora()) {
                    navigation.classList.remove('fixed');
                }
                if(this.isRecurso()) {
                    navigation.classList.add('fixed');
                }
                if(this.isHora()) {
                    navigation.classList.add('fixed');
                }
            } else {
                //if ( this.isHomePage ){
                navigation.classList.add('fixed');
                //}
            }
        }
    }

    ngOnInit(): void {
        const navigation = window.document.getElementById('navigation');
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Execute your function here
                if ((this.isRecurso() || this.isHora()) && navigation) {
                    navigation.classList.add('fixed');
                } else if ((!this.isRecurso() || !this.isHora()) && navigation) {
                    navigation.classList.remove('fixed');
                }
            }
        });
    }

    isRecurso(): boolean {
        return this.location.path().includes('/recursos/');
    }

    isHora(): boolean {
        return this.location.path().includes('/hora-confirmada');
    }

    openMenu() {
        if ((this.hideMenu = false)) {
            this.hideMenu = true;
        } else {
            this.hideMenu = false;
        }
    }

    closeMenu() {
        this.hideMenu = true;
    }
}
