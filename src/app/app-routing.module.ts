import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

const routes: Routes = [
    {
        path:"",
        redirectTo: "books",
        pathMatch: "full"
    },
    {
        path:"books",
        component: BookListComponent
    },
    {
        path: "book/:id",
        component: BookDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
