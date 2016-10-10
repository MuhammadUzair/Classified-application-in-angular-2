import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {classifiedService } from './service';
import {provide} from 'angular2/core';
import {LOOKUP_LISTS, lookupLists} from './providers';
import {HTTP_PROVIDERS, XHRBackend} from 'angular2/http';
import {MockXHRBackend} from './mock-xhr-backend';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(AppComponent, [
        classifiedService ,
        provide(LOOKUP_LISTS, { useValue: lookupLists }),
        HTTP_PROVIDERS,
        provide(XHRBackend, { useClass: MockXHRBackend }),
        ROUTER_PROVIDERS
    ]);