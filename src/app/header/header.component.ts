import { Component, EventEmitter, Output } from '@angular/core';

import { FeatureModel } from '../shared/feature.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    protected readonly featureModel = FeatureModel;

    @Output() featureSelected = new EventEmitter<FeatureModel>();

    onSelect(feature: FeatureModel) {
        this.featureSelected.emit(feature);
    }

}
