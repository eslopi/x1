import { NavigatedData, Page } from '@nativescript/core';
import { MapViewModel } from '../../view-models/map.view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MapViewModel();
}