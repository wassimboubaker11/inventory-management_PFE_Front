import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { KanbanComponent } from './kanban/kanban.component';
import { AddArticleComponent } from './kanban/add-article/add-article.component';
import { EditArticleComponent } from './kanban/edit-article/edit-article.component';
import { OptionComponent } from './option/option.component';
import { UserComponent } from './user/user.component';
import { ArticleByDepotComponent } from './chat/article-by-depot/article-by-depot.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DetailsArticleComponent } from './kanban/details-article/details-article.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { EditOptionComponent } from './option/edit-option/edit-option.component';
import { AlertComponent } from './alert/alert.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'chat/article/:id', component: ArticleByDepotComponent },
    { path: 'kanban-board', component: KanbanComponent },
    {path:  'Kanban-board/addarticle' , component:AddArticleComponent},
    {path:  'Kanban-board/editarticle/:id' , component:EditArticleComponent},
    {path:  'Kanban-board/detailsarticle/:id' , component:DetailsArticleComponent},
    {path:  'option' , component:OptionComponent},
     {path: 'edit-option/:id', component:EditOptionComponent},
    {path:  'user' , component:UserComponent},
    {path:  'user/adduser' , component:AddUserComponent},
    {path:  'category' , component:CategoryComponent},
    {path : 'alert' , component:AlertComponent},
    { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) , canActivate: [AuthGuard]},
    { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) , canActivate: [AuthGuard]},
    { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) , canActivate: [AuthGuard]},
    { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UIModule), canActivate: [AuthGuard] },
    { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule), canActivate: [AuthGuard] },
    { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) , canActivate: [AuthGuard]},
    { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule), canActivate: [AuthGuard] },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule), canActivate: [AuthGuard] },
    { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule), canActivate: [AuthGuard] },
    { path: 'tier',loadChildren:() => import('./client-founisseur/client-founisseur.module').then(m=>m.ClientFounisseurModule), canActivate: [AuthGuard]}
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
