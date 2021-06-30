import { TestBed } from '@angular/core/testing';

import { InventoryReceivingService } from './inventory-receiving.service';

describe('InventoryReceivingService', () => {
  let service: InventoryReceivingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryReceivingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
