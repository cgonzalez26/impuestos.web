import { Component, OnInit } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";

import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";

import { locale as english } from "./i18n/en";
import { locale as spanish } from "./i18n/es";
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ImpuestosAutService } from 'app/services/impuestos_aut/impuestos_aut.service';
import { ImpuestosInmService } from 'app/services/impuestos_inm/impuestos_inm.service';
import { ImpuestosTsgService } from 'app/services/impuestos_tsg/impuestos_tsg.service';

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
     @BlockUI('bw-blockui-impuestos-aut') impuestosAutBlockUI: NgBlockUI;
     @BlockUI('bw-blockui-impuestos-inm') impuestosInmBlockUI: NgBlockUI;
     @BlockUI('bw-blockui-impuestos-tsg') impuestosTsgBlockUI: NgBlockUI;

    impuestos_aut_count: number;
    impuestos_inm_count: number;
    impuestos_tsg_count: number;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _router: Router,
        private _impuestos_autService: ImpuestosAutService,
        private _impuestos_inmService: ImpuestosInmService,
        private _impuestos_tsgService: ImpuestosTsgService,
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false,
                },
                toolbar: {
                    hidden: false,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: false,
                },
            },
        };
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit() {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        /*this.impuestosAutBlockUI.start();
        setTimeout(() => {
            this.impuestosAutBlockUI.stop(); // Stop blocking
          }, 1000);*/

        this.impuestosAutBlockUI.start();
        this._impuestos_autService.count().subscribe(response => {
            this.impuestos_aut_count = response;
            this.impuestosAutBlockUI.stop();
        }, error => {
            this.impuestosAutBlockUI.stop();
        });

        this.impuestosInmBlockUI.start();
        this._impuestos_inmService.count().subscribe(response => {
            this.impuestos_inm_count = response;
            this.impuestosInmBlockUI.stop();
        }, error => {
            this.impuestosInmBlockUI.stop();
        });

        this.impuestosTsgBlockUI.start();
        this._impuestos_tsgService.count().subscribe(response => {
            this.impuestos_tsg_count = response;
            this.impuestosTsgBlockUI.stop();
        }, error => {
            this.impuestosTsgBlockUI.stop();
        });

    }

    goToImpuestosAut(){        
        this._router.navigate(['ui/management/impuestos_aut']);         
    }
    goToImpuestosInm(){        
        this._router.navigate(['ui/management/impuestos_inm']);         
    }
    goToImpuestosTsg(){        
        this._router.navigate(['ui/management/impuestos_tsg']);         
    }
}
