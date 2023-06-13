import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  admin: any;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  role: any;
  year: number = new Date().getFullYear();

  constructor(
    private Alertservice: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    public authFackservice: AuthfakeauthenticationService
  ) {}

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  token: any;

  login() {
    this.admin = this.loginForm.value;
    this.authenticationService.login(this.admin).subscribe(
      res => {
        this.token = res;
        localStorage.setItem('token', this.token.token);
        this.role = this.authenticationService.getUserDATAFromToken();
        console.log(this.role);
        console.log(res);

        if (this.role === 'ADMIN' || this.role === 'USER') {
          this.router.navigate(['/']);
          this.getAllAlerts();
        } else if (this.role === 'SUPER_ADMIN') {
          this.router.navigate(['/calendar']);
        }
      },
      err => {
        console.log(err);
        // this.router.navigate(['/auth/error'])
      }
    );
  }

  getAllAlerts() {
    this.Alertservice.getallalert().subscribe(
      response => {
        const alerts = response;
        console.log(alerts);
        this.timer(alerts);
      },
      err => {
        console.log(err);
      }
    );
  }

  timer(alerts: any) {
    const filteredArticles = alerts?.filter(alert =>
        alert.article.quantite < alert.quanityMuni ||
        alert.article.quantite > alert.quanityMax
    );

    console.log("aaaaaa", filteredArticles)

    if (filteredArticles && filteredArticles.length > 0) {
      const articleNames = filteredArticles.map(alert => alert.article.nom);

      console.log("gggggg", articleNames)
      Swal.fire({
        title: 'Articles with Alerts',
        html: `The following articles have alerts: <br><strong>${articleNames.join(', ')}</strong>`,
        icon: 'info',
        confirmButtonText: 'OK',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  }



  /**
   * Form submit
   */
  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   } else {
  //     if (environment.defaultauth === 'firebase') {
  //       this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
  //         this.router.navigate(['/']);
  //       })
  //         .catch(error => {
  //           this.error = error ? error : '';
  //         });
  //     } else {
  //       this.authFackservice.login(this.f.email.value, this.f.password.value)
  //         .pipe(first())
  //         .subscribe(
  //           data => {
  //             this.router.navigate(['/']);
  //           },
  //           error => {
  //             this.error = error ? error : '';
  //           });
  //     }
  //   }
  // }

}
