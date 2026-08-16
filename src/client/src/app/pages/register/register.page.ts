import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, ToastController, IonButtons, IonBackButton, IonIcon, IonList, IonItem, IonText, IonButton, IonSpinner, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, lockClosedOutline, mailOutline, arrowBackOutline, personAddOutline } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonButton,
    IonText,
    IonItem,
    IonList,
    IonIcon,
    IonBackButton,
    IonButtons,
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
export class RegisterPage implements OnInit {
  public registerForm!: FormGroup;
  public loading: boolean = false;

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {
    addIcons({
      personOutline,
      lockClosedOutline,
      mailOutline,
      arrowBackOutline,
      personAddOutline,
    });
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  private passwordMatchValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { name, email, password } = this.registerForm.value;

    try {
      const success = await this.authService.register(name, email, password);

      if (success) {
        await this.presentToast('Cuenta creada exitosamente', 'success');
        this.loading = false;
        this.router.navigate(['/catalog'], { replaceUrl: true });
      } else {
        this.presentToast(
          'Error al crear la cuenta. El correo podría estar en uso.',
          'warning',
        );
      }
    } catch (error) {
      this.presentToast('Hubo un error interno de red.', 'danger');
    } finally {
      if (this.loading) this.loading = false;
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
