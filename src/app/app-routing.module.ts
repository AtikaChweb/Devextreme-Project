import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdataComponent } from './components/userdata/userdata.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path: '',
  redirectTo: 'registration',
pathMatch: 'full',
},
{
  path: 'registration',
  component: RegistrationComponent
},{
  path: 'userdata',
  component: UserdataComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
