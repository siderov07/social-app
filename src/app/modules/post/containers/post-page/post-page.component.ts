import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/core/entities/posts/post.interface';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { IJwtToken } from 'src/app/core/entities/authentication/jwt-token.interface';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<IPost>;
  currentUser = this.auth.getToken(true) as IJwtToken | null;

  constructor(
    private router: ActivatedRoute,
    private service: PostsService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    const postId = +this.router.snapshot.paramMap.get('postId');
    this.post$ = this.service.getPostById(postId);
  }
}
