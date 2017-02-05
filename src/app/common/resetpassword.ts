import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';

@Component({
    selector: 'resetpassword',
    template: `
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h2>Reset Password</h2>
            </div>
        </div>
    </div>
</header>

<div class="omb_login login">
    <div class="row omb_row-sm-offset-3">
        <div class="col-xs-12 col-sm-6">
            <form class="omb_loginForm" role="form" (submit)="reset($event, email.value)">
                <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                    <input type="email" #email class="form-control" 
                    id="email" name="email" placeholder="email">
                </div>
                <span class="help-block"></span>
                <div [innerHTML]="errorMessage"></div>
                <span class="help-block"></span>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Reset</button>
            </form>
        </div>
    </div>

</div>`,
    styles: ['.login{margin-top:10%;margin-bottom:10%;margin-left:33%;width:70%;}']
})
export class ResetPassword {
    API_URL: string = 'http://api.playarshop.com';
    errorMessage: string;

    constructor(public router: Router, public http: Http) {
        if (localStorage.getItem('id_token')) {
            this.router.navigate(['/home']);
        }
    }

    reset(event, email) {
        event.preventDefault();
        let body = JSON.stringify({ email });
        // HTTP POST TO API 
        this.http.post(`${this.API_URL}/users/password/new`, body, { headers: contentHeaders })
            .subscribe(
                response => {
                    this.router.navigate(['/login']);
                    console.log('post: ' + body + '\nresponse: '
                        + JSON.stringify(response.json()));
                },
                error => {
                    alert(error.json().errors);
                    console.log(error.json().errors);
                }
            );
    }
}
