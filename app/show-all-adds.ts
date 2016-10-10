import {Component} from 'angular2/core';
import {classifiedComponent} from './show-adds';
import {classifiedService } from './service';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'media-item-list',
    directives: [classifiedComponent, ROUTER_DIRECTIVES],
    templateUrl: 'app/view/show-all-adds.html',
    styleUrls: ['app/view/show-all-adds.css']
})
export class classifiedListComponent {
    category = '';
    classifieds = [];
    
    constructor(private classifiedService : classifiedService ,
        private routeParams: RouteParams) {}
    
    ngOnInit() {
        this.category = this.routeParams.get('category');
        this.getclassifieds(this.category);
    }

    onclassifiedDeleted(classified) {
        this.classifiedService .delete(classified)
            .subscribe(() => {
                this.getclassifieds(this.category);
            });
    }
    
    getclassifieds(category) {
        this.category = category;
        this.classifiedService .get(category)
            .subscribe(classifieds => {
                this.classifieds = classifieds;
            });
    }
}