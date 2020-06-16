import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ThemeService } from './config/theme/theme.service';
import { TokenInterceptor } from './http-interceptors/token.interceptor';
import { EndpointInterceptor } from './http-interceptors/api-endpoint.interceptor';
import { UserService } from './services/user.service';
import { LogedUserGuard } from './guards/loged-user.guard';
import { PostsService } from './services/posts.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { UserStoreService } from '../store/user-store.service';
import { ProfilePermissionGuard } from './guards/profile-permission.guard';
import { NotificationsService } from './services/notifications.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ApiRoutes } from './config/api/api-routes';
import { NavUserProfileComponent } from './components/nav-user-profile/nav-user-profile.component';
import { SocialAppModule } from '../social-app/social-app.module';
import { SharedModule } from '../shared/shared.module';
import { ClickOutsideModule } from 'ng-click-outside';

const config: SocketIoConfig = { url: ApiRoutes.BaseUrl, options: {} };

@NgModule({
  declarations: [NavComponent, SideNavComponent, NavUserProfileComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SocialAppModule,
    SharedModule,
    SocketIoModule.forRoot(config),
    ClickOutsideModule
  ],
  exports: [NavComponent, SideNavComponent],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
    ThemeService,
    UserService,
    LogedUserGuard,
    PostsService,
    UserStoreService,
    ProfilePermissionGuard,
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EndpointInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
