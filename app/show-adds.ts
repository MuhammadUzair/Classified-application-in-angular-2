import {Component, Input, Output, EventEmitter} from 'angular2/core';


@Component({
    selector: 'media-item',
    template: `
                    <h2>{{ classified.name }}</h2><br >

        <div>Category  : {{ classified.category }}</div><br >
        <div>Model  : {{ classified.model }}</div><br ><br >
        <div>Color : {{ classified.color }}</div><br ><br >
        <div>Extra Detail  : {{ classified.detail }}</div><br >
        <div>Price (RS)  : {{ classified.price }}</div><br >
        <div class="tools">
            <a class="delete" (click)="onDelete()">
                remove
            </a>

        </div>


    
    `,
    styleUrls: ['app/view/show-adds.css']
})
export class classifiedComponent {
    @Input('classifiedToWatch') classified;
    @Output('deleted') delete = new EventEmitter();
    
    onDelete() {
        this.delete.emit(this.classified);
    }
}