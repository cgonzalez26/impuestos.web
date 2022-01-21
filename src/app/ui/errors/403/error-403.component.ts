import { Component, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
    selector: 'error-403',
    templateUrl: './error-403.component.html',
    styleUrls: ['./error-403.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Error403Component {
    /**
     * Constructor
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }
}
