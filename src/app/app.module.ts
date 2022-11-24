import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from './components/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { authInteractor } from './Interceptors/authInterceptor';
import { SettingsComponent } from './components/settings/settings.component';
import { WriteComponent } from './components/write/write.component';
import { SavingsComponent } from './components/savings/savings.component';
import {MatMenuModule} from '@angular/material/menu';
import { PublishComponent } from './components/publish/publish.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ArticleComponent } from './components/article/article.component';
import { OtherProfilComponent } from './components/other-profil/other-profil.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddCollaboratorsComponent } from './components/dialog/add-collaborators/add-collaborators.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {MatBadgeModule} from '@angular/material/badge';
import { SearchComponent } from './components/search/search.component';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { StatsComponent } from './components/stats/stats.component';
import { ReadLaterComponent } from './components/read-later/read-later.component';
import { HistoryComponent } from './components/history/history.component';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ReportComponent } from './components/dialog/report/report.component';
import { DashboardComponent } from './components/private/dashboard/dashboard.component';
import { ReportsComponent } from './components/private/reports/reports.component';
import { AccessDashboardComponent } from './components/dialog/access-dashboard/access-dashboard.component';
import { OverviewComponent } from './components/private/overview/overview.component';
import { ArticlesStatsComponent } from './components/articles-stats/articles-stats.component';
import { StandingStatsComponent } from './components/standing-stats/standing-stats.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    BottomSheetOverviewExampleSheetComponent,
    FooterComponent,
    ProfilComponent,
    HomeComponent,
    SettingsComponent,
    WriteComponent,
    SavingsComponent,
    PublishComponent,
    ArticleComponent,
    OtherProfilComponent,
    AddCollaboratorsComponent,
    NotificationsComponent,
    SearchComponent,
    FirstLetterPipe,
    StatsComponent,
    ReadLaterComponent,
    HistoryComponent,
    ReportComponent,
    DashboardComponent,
    ReportsComponent,
    AccessDashboardComponent,
    OverviewComponent,
    ArticlesStatsComponent,
    StandingStatsComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    HttpClientModule,
    MatMenuModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatBadgeModule,
    TextInputHighlightModule,
    ToastrModule.forRoot(), 
    InfiniteScrollModule 
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:authInteractor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
