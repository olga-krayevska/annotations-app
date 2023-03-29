import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent {

  constructor(
    private route: ActivatedRoute,
  ) {}

  docId: string | undefined;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.docId = params['id'];
    });
  }

}
