import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';
import { AnalyticsService } from './services/analytics.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';

import { MatRippleModule } from '@angular/material/core';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatDividerModule,

        MatRippleModule,
    ],
    providers: [
        FirebaseService,
        AnalyticsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
