import {HttpClient} from "@angular/common/http";
import {inject, Injectable, signal} from "@angular/core";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

@Injectable({providedIn: 'root'})
export class DocsService {
  private readonly httpClient = inject(HttpClient);
  private readonly prompt = signal<string>('');

  private getResponse(userQuery: string) {
    return this.httpClient.post<{ answer: string, sources: string[] }>(`http://localhost:5173/api/docs`, {query: userQuery}, {
      responseType: 'json'
    });
  }

  searchResponse$ = toObservable(this.prompt).pipe(
    switchMap((userQuery) => this.getResponse(userQuery)),
  );

  updateQuery(userInput: string) {
    this.prompt.set(userInput);
  }

}
