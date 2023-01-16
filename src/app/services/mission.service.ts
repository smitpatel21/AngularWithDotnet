import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  constructor(private http: HttpClient) {}

  getMissionById(id: number) {
    return this.http.get(`http://localhost:5250/api/mission/${id}`);
  }

  getMissions() {
    return this.http.get('http://localhost:5250/api/mission');
  }

  addMission(data: any) {
    return this.http.post('http://localhost:5250/api/mission', data);
  }

  updateMission(id: number, data: any) {
    return this.http.put(`http://localhost:5250/api/mission/${id}`, data);
  }
}
