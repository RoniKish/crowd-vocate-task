import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

// component
import { TaskHandlerComponent } from './task-handler/task-handler.component';


// route
const routes:Routes = [
    {path:'', component:TaskHandlerComponent},
    {path:'Main Page', component:TaskHandlerComponent},
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule{}