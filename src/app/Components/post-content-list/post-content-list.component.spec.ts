import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContentListComponent } from './post-content-list.component';

describe('PostContentListComponent', () => {
  let component: PostContentListComponent;
  let fixture: ComponentFixture<PostContentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostContentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
