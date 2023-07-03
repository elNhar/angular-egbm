import { Component, Input, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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
        private router: Router
    ) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const navigation = window.document.getElementById('navigation');
        let top = this.scroll.getScrollPosition();
        if (navigation) {
            if (top[1] < 10) {
                //if ( this.isHomePage ){
                    navigation.classList.remove('fixed');
                //}
            } else {
                //if ( this.isHomePage ){
                navigation.classList.add('fixed');
                //}
            }
        }
    }

    ngOnInit(): void {
        /* const navigation = window.document.getElementById('navigation');
        this.isHome();
        if(this.isHomePage && navigation) {
            navigation.classList.remove('fixed');
        } */
    }
    
    /* isHome(){
        const navigation = window.document.getElementById('navigation');
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const urlTree = this.router.parseUrl(event.url);
                if (!urlTree.root.children['primary'] && navigation) {
                    navigation.classList.add('white');
                    this.isHomePage = true;
                } else {
                    if(navigation) {
                        navigation.classList.remove('white');
                        this.isHomePage = false;
                    }
                }
            }
        });
    } */

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
