import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BaseService } from "../base.service";
//import { QueryDto, Filter } from "app/main/models/query.dto";
import { ImpuestosAut } from "app/models/impuestos_aut/impuestos_aut";
import {environment} from 'environments/environment';

@Injectable()
export class ImpuestosAutService extends BaseService<ImpuestosAut> {
    TAG = "ImpuestosAutService";
    private readonly controller = "ImpuestosAut";
    private formBehaviorSubject: BehaviorSubject<ImpuestosAut>;
    public formObservable: Observable<ImpuestosAut>;

    //private entitiesBehaviorSubject: BehaviorSubject<Establecimiento[]>;
    //public entitiesObservable: Observable<Establecimiento[]>;
    //private entityBehaviorSubject: BehaviorSubject<Establecimiento>;
    //public entityObservable: Observable<Establecimiento>;

    constructor(private http: HttpClient) {
        super(http, "ImpuestosAut");
        //this.entitiesBehaviorSubject = new BehaviorSubject<Establecimiento[]>(
        //    []
        //);
        //this.entitiesObservable = this.entitiesBehaviorSubject.asObservable();
        //this.entityBehaviorSubject = new BehaviorSubject<Establecimiento>(null);
        //this.entityObservable = this.entityBehaviorSubject.asObservable();
        
        this.formBehaviorSubject = new BehaviorSubject<ImpuestosAut>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
        this.formObservable = this.formBehaviorSubject.asObservable();
    }

    public get form(): ImpuestosAut {
        return this.formBehaviorSubject.value;
    }

    public setForm(form: ImpuestosAut): void {
        this.formBehaviorSubject.next(form);
    }

    /*public get entities(): Establecimiento[] {
        return this.entitiesBehaviorSubject.value;
    }

    public setEntities(entities: Establecimiento[]): void {
        this.entitiesBehaviorSubject.next(entities);
    }

    public get entity(): Establecimiento {
        return this.entityBehaviorSubject.value;
    }

    public setEntity(entity: Establecimiento): void {
        this.entityBehaviorSubject.next(entity);
    }*/

    /************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

    /**
     * Overridden base method
     */
    public getAll(): Observable<ImpuestosAut[]> {
        return super.getAll((response) => {
            this.setEntities(response);
        });
    }

    /**
     * Overridden base method
     */
    public getById(id: string): Observable<ImpuestosAut> {
        return super.getById(id, (response) => {
            this.setEntity(response);
        });
    }

    /**
     * Overridden base method
     */
    public addForm(form: ImpuestosAut) {
        // const url = `${this.controller}/add`;
        const url = `${this.controller}/custom/add`;
        return this.HttpClient.post<ImpuestosAut>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public add(entity: ImpuestosAut) {
        return super.add(entity, (response) => {
            this.entities.push(entity);
            this.setEntities(this.entities);
        });
    }

    /**
     * Overridden base method
     */
    public editForm(form: ImpuestosAut) {
        const url = `${this.controller}/edit`;
        return this.HttpClient.put<ImpuestosAut>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public edit(id: string, entity: ImpuestosAut) {
        return super.edit(id, entity, (response) => {
            const index = this.entities.findIndex((e) => e.Id == id);
            if (index >= 0) {
                this.entities[index] = entity;
                this.setEntities(this.entities);
            }
        });
    }

    /**
     * Overridden base method
     */
    public delete(id: string) {
        return super.delete(id, (response) => {
            const index = this.entities.findIndex((e) => e.Id == id);
            if (index >= 0) {
                this.entities.splice(index, 1);
                this.setEntities(this.entities);
            }
        });
    }

    addEntity(entity: ImpuestosAut) {
        this.entities.push(entity);
        this.setEntities(this.entities);
    }
    /************************* END: OVERRIDDEN BASE METHODS **************************/

    public customGetAll(): Observable<ImpuestosAut[]> {
        const url: string = `${this.controller}/custom/all`;
        return this.HttpClient.get<ImpuestosAut[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }

    public getByName(name: string): Observable<ImpuestosAut[]> {
        const url: string = `${this.controller}/name/${name}`;
        return this.HttpClient.get<ImpuestosAut[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }  

    /*public countWhere(filter: Filter): Observable<number> {
        const url: string = `${this.controller}/count-where`;
        return this.HttpClient.post<number>(url, filter).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public query(
        queryDto: QueryDto<Establecimiento>
    ): Observable<QueryDto<Establecimiento>> {
        const url: string = `${this.controller}/query`;
        return this.HttpClient.post<QueryDto<Establecimiento>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public customGetByQuery(
        queryDto: QueryDto<Establecimiento>
    ): Observable<QueryDto<Establecimiento>> {
        const url: string = `${this.controller}/custom/query`;
        return this.HttpClient.post<QueryDto<Establecimiento>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }*/
    
}
