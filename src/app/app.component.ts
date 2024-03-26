import { Component } from '@angular/core';
import { FeatureModel } from './shared/feature.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'angular-course-cookbook';
    protected readonly FeatureModel = FeatureModel;

    selectedFeature = FeatureModel.recipe;

    onNavigate(feature: FeatureModel) {
        this.selectedFeature = feature;
    }
}
