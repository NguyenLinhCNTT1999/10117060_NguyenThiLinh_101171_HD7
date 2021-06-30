import { TestBed } from '@angular/core/testing';

import { ChuongTrinhDaoTaoService } from './chuong-trinh-dao-tao.service';

describe('ChuongTrinhDaoTaoService', () => {
  let service: ChuongTrinhDaoTaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuongTrinhDaoTaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
