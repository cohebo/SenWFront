import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUselessBoxComponent } from './game-useless-box.component';

describe('GameUselessBoxComponent', () => {
  let component: GameUselessBoxComponent;
  let fixture: ComponentFixture<GameUselessBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameUselessBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameUselessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
