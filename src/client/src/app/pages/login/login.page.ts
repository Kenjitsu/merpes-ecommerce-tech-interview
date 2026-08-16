import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonText, IonButton, IonIcon, IonSpinner, IonItem, IonList, IonButtons, IonBackButton, IonInput } from '@ionic/angular/standalone';
import { Auth } from 'src/app/services/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, logInOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons, 
    IonList,
    IonItem,
    IonSpinner,
    IonIcon,
    IonButton,
    IonText, 
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: boolean = false;
  private returnUrl: string = '/catalog';

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({
      personOutline,
      lockClosedOutline,
      logInOutline,
      arrowBackOutline,
    });

      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/catalog';
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    try {
      const result = await this.authService.login(email, password);

      if (result.isSuccess) {
        this.router.navigate([ this.returnUrl ], { replaceUrl: true });
        this.presentToast(result.message || 'Inicio de sesión satisfactorio', 'success');
        
      } else {
        this.presentToast(result.error?.description || 'Error en inicio de sesión', 'warning');
      }
    } catch (error) {
      this.presentToast('Ha ocurrido un error interno', 'danger');
    } finally {
      this.loading = false;
    }
  }

  async presentToast(message: string, color: 'danger' | 'warning' | 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
      buttons: [{ text: 'OK', role: 'cancel' }],
    });
    await toast.present();
  }
}
