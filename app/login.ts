import {Component, Inject} from 'angular2/core';
import {Control, Validators,FormBuilder} from 'angular2/common';
import {classifiedService } from './service';
import {LOOKUP_LISTS} from './providers';
import {Router} from 'angular2/router';

@Component({
    selector: 'welcome',
    template: `
    <div class="hide"></div>
    <div class="sign-in">
   <form [ngFormModel]="form" (ngSubmit)="onSubmit(form.value)">
  <div class="headng">  Login </div>   
                <ul>

                        <li>
                            <label for="name">User Name</label>
                            <input type="text" name="name" id="name" required
                                ngControl="name"
                                #name="ngForm">
                            <div *ngIf="name.errors?.pattern" class="error">
                                name has invalid characters
                            </div>
                        </li>

                        <li>
                            <label for="name">Password:</label><br >
                            <input type="password" name="password" id="password" required
                                ngControl="password"
                                #password="ngForm">
                            <div *ngIf="password.errors?.pattern" class="error">
                                password has invalid characters
                            </div>
                        </li>

                           <button type="submit">login</button>


                    </ul>    

                </form>


                </div>


    <div class="sign-up">
                    <form [ngFormModel]="registration" (ngSubmit)="onSubmit(registration.value)"> 

                     <div class="headng"> Register</div>
                    <ul>

                        <li>
                            <label for="name">User Name</label>
                            <input type="text" name="name" id="name" 
                            ngControl="rname"
                                #rname="ngForm">

                        </li>

                        <li>
                            <label for="name">Password:</label>
                            <input type="password" name="password" id="password"
                            ngControl="rpassword"
                                #rpassword="ngForm" >
                        </li>


                    </ul>    
                    
                       <button (click)="register(registration.value)" class="submnt">Submint</button>


                       </form>
                    
          </div>          
    
    `,
    styleUrls: ['app/view/insert-add.css']
})
export class Login {
    form;
    registration;

    

    constructor(private formBuilder: FormBuilder,
        private classifiedService : classifiedService ,
        @Inject(LOOKUP_LISTS) public lookupLists,
           private router:Router) {
                localStorage.setItem("userName","admin");
               localStorage.setItem("password", "admin");
            }

   ngOnInit() {
        this.form = this.formBuilder.group({
            'name': new Control('', Validators.compose([
                Validators.required
                ])),
           'password': new Control('', Validators.compose([
                Validators.required
                ]))

        });

      this.registration = this.formBuilder.group({
            'rname': new Control('', Validators.compose([
                Validators.required
                ])),
           'rpassword': new Control('', Validators.compose([
                Validators.required
                ]))

        });
    }
    


    onSubmit(classified,UserName,Password) {

  var UserName =localStorage.getItem("userName");
    var Password =localStorage.getItem("password");
  

        if(classified.name == UserName && classified.password == Password)
        {
           

           this.classifiedService .get("Laptop")
                  .subscribe(() => {
                 this.router.navigate(['../List',{category:classified.category}]);
                   });
            

        }





    }

        register(classified) {

            if(classified.rname !== "" && classified.rpassword !== "")
            {
                localStorage.setItem("userName", classified.rname);
               localStorage.setItem("password", classified.rpassword);
              //   alert(" registetion done");
                
            }
           
            else
            {
                 alert("Please enter correct User Name and Password for register");

            }


    }


}