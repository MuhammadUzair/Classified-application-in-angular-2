import {Component} from 'angular2/core';
import {classifiedListComponent} from './show-all-adds';
import {classifiedFormComponent} from './insert-add';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
 import {Login} from './login';


@RouteConfig([
    { path: '', component: Login },
    { path: '/:category', component: classifiedListComponent, name: 'List'},
    { path: '/add', component: classifiedFormComponent, name: 'Addclassified' },
])
@Component({
    selector: 'media-tracker-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/view/app.component.html',
    styleUrls: ['app/view/app.component.css']
})
export class AppComponent {
}