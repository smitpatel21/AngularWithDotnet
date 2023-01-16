import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loading = false;
  constructor() {}
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  getLoading() {
    return this.loading;
  }
}
