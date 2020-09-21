import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from './services/analytics.service';
import { FirebaseService } from './services/firebase.service';

export type Thing = 'Amango tea' | 'Spicy shrimp' | 'Tortoise stew' | 'Earth spirit parfait' | 'Set lunch B' | 'Spaghetti and meatballs' | 'Tomato soup' | 'Ice cream' | 'Grilled fish' | 'Mandragosso' | 'Polwigle dumpling' | 'Mabo curry' | "Don's special" | 'Clam chowder' | 'Seafood pasta' | 'Fruit cocktail' | 'Rappig steak' | 'Cream stew' | 'Chocolate cake' | 'Set lunch A';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    
    public things: Thing[] = [];
    public thingsSplit1: Thing[] = [];
    public thingsSplit2: Thing[] = [];

    public order: {
        thing: Thing;
        quantity: number;
    }[] = [];

    public orderedOrder: {
        thing: Thing;
        quantity: number;
    }[] = [];

    public orderMap: {
        [thing in Thing]?: boolean;
    } = {};

    public pendingOrder?: {
        thing: Thing;
        quantity: number;
    }

    private _routerEventsSub?: Subscription;

    public showSettings?: boolean;

    public things0: Thing[] = [];
    public things1: Thing[] = [];
    public things2: Thing[] = [];
    public things3: Thing[] = [];

    public lightMode?: boolean;

    public maxItems: number = 0;
    public maxItemsAry: number[] = [];

    constructor(private router: Router, public firebaseService: FirebaseService, private analyticsService: AnalyticsService) {

    }
    
    public ngOnInit(): void {
        this._routerEventsSub = this.router.events.subscribe(routerEvent=> {
			this._checkRouterEvent(routerEvent as RouterEvent);
        });

        this.order = [];
        this.orderedOrder = [];

        this.things0 = [
            'Amango tea',
            'Spicy shrimp',
            'Tortoise stew',
            'Earth spirit parfait',
            'Set lunch B',
            // 'Spaghetti and meatballs',
            // 'Tomato soup',
            // 'Ice cream',
            // 'Grilled fish',
            // 'Mandragosso',
            // // Page two
            // 'Polwigle dumpling',
            // 'Mabo curry',
            // "Don's special",
            // 'Clam chowder',
            // 'Seafood pasta',
            // 'Fruit cocktail',
            // 'Rappig steak',
            // 'Cream stew',
            // 'Chocolate cake',
            // 'Set lunch A',
        ];

        this.things1 = [
            'Amango tea',
            'Spicy shrimp',
            'Tortoise stew',
            'Earth spirit parfait',
            'Set lunch B',
            'Spaghetti and meatballs',
            'Tomato soup',
            'Ice cream',
            'Grilled fish',
            'Mandragosso',
            // // Page two
            // 'Polwigle dumpling',
            // 'Mabo curry',
            // "Don's special",
            // 'Clam chowder',
            // 'Seafood pasta',
            // 'Fruit cocktail',
            // 'Rappig steak',
            // 'Cream stew',
            // 'Chocolate cake',
            // 'Set lunch A',
        ];

        
        this.things2 = [
            'Amango tea',
            'Spicy shrimp',
            'Tortoise stew',
            'Earth spirit parfait',
            'Set lunch B',
            'Spaghetti and meatballs',
            'Tomato soup',
            'Ice cream',
            'Grilled fish',
            'Mandragosso',
            // Page two
            'Polwigle dumpling',
            'Mabo curry',
            "Don's special",
            'Clam chowder',
            'Seafood pasta',
            // 'Fruit cocktail',
            // 'Rappig steak',
            // 'Cream stew',
            // 'Chocolate cake',
            // 'Set lunch A',
        ];

        this.things3 = [
            'Amango tea',
            'Spicy shrimp',
            'Tortoise stew',
            'Earth spirit parfait',
            'Set lunch B',
            'Spaghetti and meatballs',
            'Tomato soup',
            'Ice cream',
            'Grilled fish',
            'Mandragosso',
            // Page two
            'Polwigle dumpling',
            'Mabo curry',
            "Don's special",
            'Clam chowder',
            'Seafood pasta',
            'Fruit cocktail',
            'Rappig steak',
            'Cream stew',
            'Chocolate cake',
            'Set lunch A',
        ];

        this.setItems(0);
        this.setMaxItems(9);
    }
    
	private _checkRouterEvent(routerEvent: RouterEvent): void {
		// Tracking page views
		if (routerEvent instanceof NavigationEnd) {
			try {
                this.analyticsService.addPageView({
                    url: routerEvent.urlAfterRedirects,
                });
			} catch(error) {
                console.error(error);
			}
        }
    }

    public addThing(thing: Thing): void {
        this.pendingOrder = {
            thing: thing,
            quantity: 1,
        };
    }

    public cancel(): void {
        this.pendingOrder = undefined;
    }

    public setQuantity(num: number): void {
        if (!this.pendingOrder) {
            console.error("Unexpected missing pendingOrder");
            return;
        }

        this.pendingOrder.quantity = num;
        this.addOrder();
    }

    public addOrder(): void {
        if (!this.pendingOrder) {
            console.error("Unexpected missing pendingOrder");
            return;
        }

        this.order.push(this.pendingOrder);
        this.pendingOrder = undefined;
        this.updateOrder();
    }

    public clear(): void {
        this.order = [];
        this.updateOrder();
    }

    public backspace(): void {
        this.order.pop();
        this.updateOrder();
    }

    public updateOrder(): void {
        this.orderedOrder = this.order.slice(0);

        this.orderMap = {};

        for (const order of this.orderedOrder) {
            this.orderMap[order.thing] = true;
        }

        this.orderedOrder.sort((a, b) => {
            let aV = 0;
            let bV = 0;

            for (let i = 0; i < this.things.length; i++) {
                const thing = this.things[i];

                if (a.thing === thing) {
                aV = i;
                }

                if (b.thing === thing) {
                bV = i;
                }
            }

            return aV - bV;
        });
    }

    public setItems(num: number, toggleEvent?: MatSlideToggleChange): void {
        // console.log(num, toggleEvent);

        if (toggleEvent && !toggleEvent.checked) {
            num -= 1;
        }

        if (num === 0) {
            this.things = this.things0;
            this.thingsSplit1 = this.things0;
            this.thingsSplit2 = [];
        } else if (num === 1) {
            this.things = this.things1;
            this.thingsSplit1 = this.things1;
            this.thingsSplit2 = [];
        } else if (num === 2) {
            this.things = this.things2;
            this.thingsSplit1 = this.things1;
            this.thingsSplit2 = this.things2.slice(this.things1.length);
        } else if (num === 3) {
            this.things = this.things3;
            this.thingsSplit1 = this.things1;
            this.thingsSplit2 = this.things3.slice(this.things1.length);
        } else {
            console.error("Unexpected set number");
            this.things = this.things3;
            this.thingsSplit1 = this.things1;
            this.thingsSplit2 = this.things3.slice(this.things1.length);
        }
    }

    public toggleMode(): void {
        this.lightMode =  !this.lightMode;

        if (this.lightMode) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }

    public handleSlider(sliderEvent: MatSliderChange): void {
        // console.log(sliderEvent);
        this.setMaxItems(sliderEvent.value || 9);
    }

    public setMaxItems(num: number): void {
        this.maxItems = num;
        this.maxItemsAry = [];

        for (let i = 0; i < num; i++) {
            this.maxItemsAry.push(i + 1);
        }
    }

    public ngOnDestroy(): void {
        this._routerEventsSub?.unsubscribe();
    }
}
