import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Group } from "../models/group";

const nocacheHeaders: HttpHeaders = new HttpHeaders({
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
});

@Injectable({
  providedIn: "root",
})
export class SenwService {
  constructor(private http: HttpClient) {}

  senwUrl: string = environment.backendBaseUrl + "/senw";
  GetGroups(): Observable<Array<Group>> {
    return this.http.get<Array<Group>>(`${this.senwUrl}`, {
      headers: nocacheHeaders,
    });
  }
}
