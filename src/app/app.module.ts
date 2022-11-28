import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PnlComponent } from './pnl/pnl.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgChartsModule } from 'ng2-charts';
import { TestpnlComponent } from './testpnl/testpnl.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MyAuthService } from 'src/services/my-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PnlComponent,
    TestpnlComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    NgChartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,  
    MatNativeDateModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [DatePipe,MyAuthService,{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
    ,    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },],
  bootstrap: [AppComponent]
})
export class AppModule { }
