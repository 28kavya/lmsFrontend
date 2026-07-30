import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../models/Certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private apiUrl = 'http://localhost:8081/api/certificates';

  constructor(private http: HttpClient) { }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl);
  }

  downloadCertificate(courseId: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/download/${courseId}`,
      {
        responseType: 'blob'
      }
    );
  }

}