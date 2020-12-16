import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from './services/analytics.service';
import { FirebaseService } from './services/firebase.service';

export type RestaurantItem = 'Amango tea' | 'Spicy shrimp' | 'Tortoise stew' | 'Earth spirit parfait' | 'Set lunch B' | 'Spaghetti and meatballs' | 'Tomato soup' | 'Ice cream' | 'Grilled fish' | 'Mandragosso' | 'Polwigle dumpling' | 'Mabo curry' | "Don's special" | 'Clam chowder' | 'Seafood pasta' | 'Fruit cocktail' | 'Rappig steak' | 'Cream stew' | 'Chocolate cake' | 'Set lunch A';

export type RestaurantItemTranslationMap = {
    'Amango tea': 'Amango tea' | 'うまうまティー';
    'Spicy shrimp': 'Spicy shrimp' | 'ひやピリ中華';
    'Tortoise stew': 'Tortoise stew' | 'トータス鍋';
    'Earth spirit parfait': 'Earth spirit parfait' | 'アイススピリッツパフェ';
    'Set lunch B': 'Set lunch B' | '煮獅子定食';
    'Spaghetti and meatballs': 'Spaghetti and meatballs' | '蹄パスタセット';
    'Tomato soup': 'Tomato soup' | 'ラピラブ汁';
    'Ice cream': 'Ice cream' | 'バルーンゴーストアイス';
    'Grilled fish': 'Grilled fish' | '焼ヤきネグネグ';
    'Mandragosso': 'Mandragosso' | 'マンドラゴラッソ';
    'Polwigle dumpling': 'Polwigle dumpling' | 'オタオタ団子';
    'Mabo curry': 'Mabo curry' | 'マーボーカレー';
    "Don's special": "Don's special" | 'ドンの気まぐれご飯';
    'Clam chowder': 'Clam chowder' | '巨大甲殻汁';
    'Seafood pasta': 'Seafood pasta' | 'あまあまパスタ';
    'Fruit cocktail': 'Fruit cocktail' | 'ごってごってカクテル';
    'Rappig steak': 'Rappig steak' | 'ブウサギステーキ';
    'Cream stew': 'Cream stew' | 'やみなべ';
    'Chocolate cake': 'Chocolate cake' | '蜜蜜ザッハトルテ';
    'Set lunch A': 'Set lunch A' | '蒸し剛玉定食Ａ';
}

export type ActionTranslationMap = {
    'Forget that last one...': 'Forget that last one...' | 'を、キャンセルして';
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    
    public restaurantItems: RestaurantItem[] = [];
    public restaurantItemsSplit1: RestaurantItem[] = [];
    public restaurantItemsSplit2: RestaurantItem[] = [];

    public order: {
        restaurantItem: RestaurantItem;
        quantity: number;
    }[] = [];

    public orderedOrder: {
        restaurantItem: RestaurantItem;
        quantity: number;
    }[] = [];

    public orderMap: {
        [restaurantItem in RestaurantItem]?: boolean;
    } = {};

    public pendingOrder?: {
        restaurantItem: RestaurantItem;
        quantity: number;
    }

    private _routerEventsSub?: Subscription;

    public showSettings?: boolean;

    public restaurantItems0: RestaurantItem[] = [];
    public restaurantItems1: RestaurantItem[] = [];
    public restaurantItems2: RestaurantItem[] = [];
    public restaurantItems3: RestaurantItem[] = [];

    public lightMode?: boolean;

    public maxItems: number = 0;
    public maxItemsAry: number[] = [];

    public restaurentItemTranslationMap!: RestaurantItemTranslationMap;
    public actionTranslationMap!: ActionTranslationMap;

    constructor(private router: Router, public firebaseService: FirebaseService, private analyticsService: AnalyticsService) {

    }
    
    public ngOnInit(): void {
        const lang = (localStorage.getItem("lang") || 'eng') as 'eng';

        this.setTranslationMap(lang);

        this._routerEventsSub = this.router.events.subscribe(routerEvent=> {
			this._checkRouterEvent(routerEvent as RouterEvent);
        });

        this.order = [];
        this.orderedOrder = [];

        this.restaurantItems0 = [
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

        this.restaurantItems1 = [
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

        
        this.restaurantItems2 = [
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

        this.restaurantItems3 = [
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

    public setTranslationMap(lang: 'eng' | 'jp'): void {
        try {
            localStorage.setItem("lang", lang);
        } catch (error) {
            console.error(error);
        }

        if (lang === 'jp') {
            this.restaurentItemTranslationMap = {
                'Amango tea': 'うまうまティー',
                'Spicy shrimp': 'ひやピリ中華',
                'Tortoise stew': 'トータス鍋',
                'Earth spirit parfait': 'アイススピリッツパフェ',
                'Set lunch B': '煮獅子定食',
                'Spaghetti and meatballs': '蹄パスタセット',
                'Tomato soup': 'ラピラブ汁',
                'Ice cream': 'バルーンゴーストアイス',
                'Grilled fish': '焼ヤきネグネグ',
                'Mandragosso': 'マンドラゴラッソ',
                'Polwigle dumpling': 'オタオタ団子',
                'Mabo curry': 'マーボーカレー',
                "Don's special": 'ドンの気まぐれご飯',
                'Clam chowder': '巨大甲殻汁',
                'Seafood pasta': 'あまあまパスタ',
                'Fruit cocktail': 'ごってごってカクテル',
                'Rappig steak': 'ブウサギステーキ',
                'Cream stew': 'やみなべ',
                'Chocolate cake': '蜜蜜ザッハトルテ',
                'Set lunch A': '蒸し剛玉定食Ａ',
            };

            this.actionTranslationMap = {
                'Forget that last one...': 'を、キャンセルして',
            };
        } else {
            this.restaurentItemTranslationMap = {
                'Amango tea': 'Amango tea',
                'Spicy shrimp': 'Spicy shrimp',
                'Tortoise stew': 'Tortoise stew',
                'Earth spirit parfait': 'Earth spirit parfait',
                'Set lunch B': 'Set lunch B',
                'Spaghetti and meatballs': 'Spaghetti and meatballs',
                'Tomato soup': 'Tomato soup',
                'Ice cream': 'Ice cream',
                'Grilled fish': 'Grilled fish',
                'Mandragosso': 'Mandragosso',
                'Polwigle dumpling': 'Polwigle dumpling',
                'Mabo curry': 'Mabo curry',
                "Don's special": "Don's special",
                'Clam chowder': 'Clam chowder',
                'Seafood pasta': 'Seafood pasta',
                'Fruit cocktail': 'Fruit cocktail',
                'Rappig steak': 'Rappig steak',
                'Cream stew': 'Cream stew',
                'Chocolate cake': 'Chocolate cake',
                'Set lunch A': 'Set lunch A',
            };

            this.actionTranslationMap = {
                'Forget that last one...': 'Forget that last one...',
            };
        }
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

    public addRestaurantItem(restaurantItem: RestaurantItem): void {
        this.pendingOrder = {
            restaurantItem: restaurantItem,
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
            this.orderMap[order.restaurantItem] = true;
        }

        this.orderedOrder.sort((a, b) => {
            let aV = 0;
            let bV = 0;

            for (let i = 0; i < this.restaurantItems.length; i++) {
                const restaurantItem = this.restaurantItems[i];

                if (a.restaurantItem === restaurantItem) {
                aV = i;
                }

                if (b.restaurantItem === restaurantItem) {
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
            this.restaurantItems = this.restaurantItems0;
            this.restaurantItemsSplit1 = this.restaurantItems0;
            this.restaurantItemsSplit2 = [];
        } else if (num === 1) {
            this.restaurantItems = this.restaurantItems1;
            this.restaurantItemsSplit1 = this.restaurantItems1;
            this.restaurantItemsSplit2 = [];
        } else if (num === 2) {
            this.restaurantItems = this.restaurantItems2;
            this.restaurantItemsSplit1 = this.restaurantItems1;
            this.restaurantItemsSplit2 = this.restaurantItems2.slice(this.restaurantItems1.length);
        } else if (num === 3) {
            this.restaurantItems = this.restaurantItems3;
            this.restaurantItemsSplit1 = this.restaurantItems1;
            this.restaurantItemsSplit2 = this.restaurantItems3.slice(this.restaurantItems1.length);
        } else {
            console.error("Unexpected set number");
            this.restaurantItems = this.restaurantItems3;
            this.restaurantItemsSplit1 = this.restaurantItems1;
            this.restaurantItemsSplit2 = this.restaurantItems3.slice(this.restaurantItems1.length);
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
