import { Component, OnInit } from '@angular/core';

export type Thing = 'Amango tea' | 'Spicy shrimp' | 'Tortoise stew' | 'Earth spirit parfait' | 'Set lunch B' | 'Spaghetti and meatballs' | 'Tomato soup' | 'Ice cream' | 'Grilled fish' | 'Mandragosso' | 'Polwigle dumpling' | 'Mabo curry' | "Don's special" | 'Clam chowder' | 'Seafood pasta' | 'Fruit cocktail' | 'Rappig steak' | 'Cream stew' | 'Chocolate cake' | 'Set lunch A';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public things: Thing[] = [];

  public order: {
    thing: Thing;
    quantity: number;
  }[] = [];

  public orderedOrder: {
    thing: Thing;
    quantity: number;
  }[] = [];

  public pendingOrder?: {
    thing: Thing;
    quantity: number;
  }

  public ngOnInit(): void {
    this.order = [];
    this.orderedOrder = [];

    this.things = [
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

    this.pendingOrder = undefined;
  }

  public addThing(thing: Thing): void {
    this.pendingOrder = {
      thing: thing,
      quantity: 0,
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
}
