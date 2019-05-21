import { TestBed } from '@angular/core/testing';

import { ImageHandleService } from './image-handle.service';

describe('ImageHandleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageHandleService = TestBed.get(ImageHandleService);
    expect(service).toBeTruthy();
  });
});
