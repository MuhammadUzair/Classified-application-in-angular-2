import {Request, Response, ResponseOptions, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export class MockXHRBackend {
    constructor() {
    }

    createConnection(request: Request) {
        var response = new Observable((responseObserver: Observer<Response>) => {
            var responseData;
            var responseOptions;
            switch (request.method) {
                case RequestMethod.Get:
                    if (request.url.indexOf('classified?category=') >= 0 || request.url === 'classified') {
                        var category;
                        if (request.url.indexOf('?') >= 0) {
                            category = request.url.split('=')[1];
                            if (category === 'undefined') category = '';
                        }
                        var classified;
                        if (category) {
                            classified = this._classified.filter(classified => classified.category === category);
                            if (classified.length === 0) {
                                responseOptions = new ResponseOptions({
                                    body: JSON.stringify({error: 'category is not valid'}),
                                    status: 404}
                                );
                                responseObserver.error(new Response(responseOptions));
                            }
                        } else {
                            classified = this._classified;
                        }
                        responseOptions = new ResponseOptions({
                            body: { classified: JSON.parse(JSON.stringify(classified)) },
                            status: 200
                        });
                    } else {
                        var id = parseInt(request.url.split('/')[1]);
                        classified = this._classified.filter(classified => classified.id === id);
                        responseOptions = new ResponseOptions({
                            body: JSON.parse(JSON.stringify(classified[0])),
                            status: 200
                        });
                    }
                    break;
                case RequestMethod.Post:
                    var classified = JSON.parse(request.text().toString());
                    classified.id = this._getNewId();
                    this._classified.push(classified);
                    responseOptions = new ResponseOptions({ status: 201 });
                    break;
                case RequestMethod.Delete:
                    var id = parseInt(request.url.split('/')[1]);
                    this._deleteclassified(id);
                    responseOptions = new ResponseOptions({ status: 200 });
            }
            
            var responseObject = new Response(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { };
        });
        return { response };
    }
    
    _deleteclassified(id) {
        var classified = this._classified.find(classified => classified.id === id);
        var index = this._classified.indexOf(classified);
        if (index >= 0) {
            this._classified.splice(index, 1);
        }
    }
    
    _getNewId() {
        if (this._classified.length > 0) {
            return Math.max.apply(Math, this._classified.map(classified => classified.id)) + 1;
        }
    }

    _classified = [
      {
            id: 1,
            category: "Mobile",
            name: "Samsang Galaxy",
            model: "Note 7",
            color:"black",
            detail:"2.3 GHZ Quad-Core, 1.6 GHz Quad-Core",            
            price:  93499
        },
        {
            id: 2,
           category: "Laptop",
            name: "HP",
            model: "Note Book 15",
            color:"White",
            detail:"Intel Core i3-5005U ",            
            price: 35000
        },
        {
            id: 3,
            category: "Computer",
            name: "Intel Compute Stick",   
            model: "BOXSTCK1A32WFC",
            color:"black",
            detail:"Transforms any HDMI* monitor into computer",            
            price: 12000
        },
         {
            id: 4,
            category: "Mobile",
            name: "Apple iphone 7",
            model: "Apple iphone 7",
            color:"black",
            detail:"32GB built-in, 2GB RAM  ",            
            price: 90000
        },
        {
            id: 5,
           category: "Laptop",
            name: "Dell Inspiron",
            model: "15",
            color:"black",
            detail:"Intel Core i5-5005U",            
            price: 55000
        }
  
    ];
}