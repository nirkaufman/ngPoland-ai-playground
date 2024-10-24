import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly httpClient = inject(HttpClient);

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `http://localhost:5173/api/upload`, formData, {
      responseType: 'json',
    });

    return this.httpClient.request(req);
  }
}
