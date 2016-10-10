import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class classifiedService {
    constructor(private http: Http) {}
    
    get(category) {
        var searchParams = new URLSearchParams();
        searchParams.append('category', category);
        return this.http.get('classified', {search: searchParams})
            .map(response => {
                return response.json().classified;
            });
    }
    
    add(classified) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post('classified', JSON.stringify(classified), { headers: headers })
            .map(response => {});
    }
    
    delete(classified) {
        return this.http.delete(`classified/${classified.id}`)
            .map(response => {});
    }

}