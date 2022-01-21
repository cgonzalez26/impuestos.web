import { ImpuestosInmService } from './../../../services/impuestos_inm/impuestos_inm.service';
import { ImpuestosInm } from './../../../models/impuestos_inm/impuestos_inm';
import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
/*import { MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';*/
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { MatDatepicker, } from '@angular/material/datepicker';
//import { MAT_DATE_LOCALE, MAT_DATE_FORMATS,DateAdapter } from '@angular/material/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { isEqual, omit } from 'lodash';
import { SweetAlert2Helper } from 'app/helpers/sweet-alert-2.helper';
import { KeyValue } from '@angular/common';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export interface DialogData {
  titleTranslationCode: string;
  action: string;
  form: ImpuestosInm;
}

@Component({
  selector: 'impuestos_inm-dialog',
  templateUrl: './impuestos_inm-dialog.component.html',
  styleUrls: ['./impuestos_inm-dialog.component.scss']
})
export class ImpuestosInmDialogComponent implements OnInit {
  @BlockUI('form-dialog-establecimiento') dialogBlockUI: NgBlockUI;
  dialogForm: FormGroup;
  title: string;
  action: string;
  form: ImpuestosInm; 
  rowCopy: ImpuestosInm = new ImpuestosInm();
  saveCallback: (any) => void;
  tipoestablecimientos : any[];

  constructor(
    public _matDialogRef: MatDialogRef<ImpuestosInmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: DialogData,
    private _formBuilder: FormBuilder,
    private _sweetAlert2Helper: SweetAlert2Helper,
    private _establecimientosService: ImpuestosInmService,
  ) { 
    this.dialogBlockUI.start('Cargando...');
    this.title = _dialogData.titleTranslationCode ? _dialogData.titleTranslationCode : 'COMMON.NOT_AVAILABLE';
    this.action = _dialogData.action ? _dialogData.action : 'add';
    this.form = _dialogData.form ? _dialogData.form : new ImpuestosInm();   
    this.rowCopy = JSON.parse(JSON.stringify(this.form));
    this.dialogForm = this.createDialogForm();
    this.saveCallback = null;
    this.dialogBlockUI.stop();
  }

  ngOnInit(): void {
    this.dialogBlockUI.start('Cargando...');
    combineLatest(
        //this._establecimientosService.getTipoEstablecimientos(),
    ).subscribe(      
      ([]) => {
            //this.tipoestablecimientos = _tipos;            
            //this.categories = _categories[0].SportCategories;
            this.dialogBlockUI.stop();
        }, error => {
            this._sweetAlert2Helper.error('Error', 'Ocurrió un error recuperando los formularios. Detalle: ' + error.Message, null, false);
            this.dialogBlockUI.stop();
      });  
  }

  createDialogForm(): FormGroup {
    const formGroup = this._formBuilder.group({
      sDominio: [this.form.sCatastro, [Validators.required]],
      iAnio: [this.form.iAnio],
      iPeriodo: [this.form.iPeriodo],
      //TipoEstablecimientoId: [this.form.TipoEstablecimientoId],
    });        
    return formGroup;
  }


}