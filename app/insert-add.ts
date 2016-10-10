import {Component, Inject} from 'angular2/core';
import {Control, Validators, FormBuilder} from 'angular2/common';
import {classifiedService } from './service';
import {LOOKUP_LISTS} from './providers';
import {Router} from 'angular2/router';

@Component({
    selector: 'media-item-form',
    templateUrl: 'app/view/insert-add.html',
    styleUrls: ['app/view/insert-add.css']
})
export class classifiedFormComponent {
    form;
    
    constructor(private formBuilder: FormBuilder,
        private classifiedService : classifiedService ,
        @Inject(LOOKUP_LISTS) public lookupLists,
           private router:Router) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            'name': new Control('', Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),

            'model': new Control('', Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),

            'detail': new Control('', Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),

            'color': new Control('', Validators.compose([
                Validators.required, 
                Validators.pattern('[\\w\\-\\s\\/]+')
                ])),

          'price': new Control('', Validators.compose([
                Validators.required, 
                ])),

            'category': new Control('')
        });
    }
    


    onSubmit(classified) {
        this.classifiedService .add(classified)
            .subscribe(() => {
                this.router.navigate(['../List',{category:""}]);
                
            });

    }
}