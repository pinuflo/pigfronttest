import { TestBed } from '@angular/core/testing';

import { GameService } from './gameservice.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [  ],
    imports: [
      HttpClientModule,       
    ]           
  }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });
});
