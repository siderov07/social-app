import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';
import { RouterParams } from 'src/app/core/config/constants/routing';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<IPost>;
  currentUser = this.auth.getToken(true) as IJwtToken | null;

  constructor(
    private route: ActivatedRoute,
    private service: PostsService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.paramMap.get(RouterParams.PostId);
    this.post$ = this.service.getPostById(postId);
  }
}
