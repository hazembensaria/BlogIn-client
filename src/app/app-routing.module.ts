import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { ArticlesStatsComponent } from './components/articles-stats/articles-stats.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { OtherProfilComponent } from './components/other-profil/other-profil.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { OverviewComponent } from './components/private/overview/overview.component';
import { ReportsComponent } from './components/private/reports/reports.component';
import { ProfilComponent } from './components/profil/profil.component';
import { PublishComponent } from './components/publish/publish.component';
import { ReadLaterComponent } from './components/read-later/read-later.component';
import { SavingsComponent } from './components/savings/savings.component';
import { SearchComponent } from './components/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StandingStatsComponent } from './components/standing-stats/standing-stats.component';
import { StatsComponent } from './components/stats/stats.component';
import { WriteComponent } from './components/write/write.component';
import { AuthGuard } from './Guards/authGard';

const routes: Routes = [
  {path : "" ,  component : LandingPageComponent},
  {path : "home" ,  component : HomeComponent},
  {path : "visit/:id" ,  component : OtherProfilComponent},
  {path : "notifications" ,  component : NotificationsComponent},
  {path : "tag/:id" ,  component : SearchComponent},
  {path : "publish/:id" ,  component : PublishComponent},
  {path : "write" ,  component : WriteComponent},
  {path : "article/:id" ,  component : ArticleComponent},
  {path : "settings" ,  component : SettingsComponent},
  {path : "edite/:id" ,  component : WriteComponent},
  {path : "stats" ,  component : StatsComponent , children:[
    {path : "" ,  component : ArticlesStatsComponent},
    {path : "standing" ,  component : StandingStatsComponent},
  ]},
  {path : "saves" ,  component : ReadLaterComponent},
  {path : "history" ,  component : HistoryComponent},
  {path : "profil" ,  component : SavingsComponent ,canActivate:[AuthGuard]},
  {path : "dashboard" ,  component : DashboardComponent , children:[
    {path : "reports" ,  component : ReportsComponent},
    {path : "overView" ,  component : OverviewComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
