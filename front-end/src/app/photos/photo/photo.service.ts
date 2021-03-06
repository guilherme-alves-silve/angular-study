import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Photo } from "./photo";
import { PhotoComment } from "./photo-comment";

const API = 'http://localhost:3000';

@Injectable({
    providedIn: "root"
})
export class PhotoService {

    constructor(private _http: HttpClient) { }

    listFromUser(userName: string): Observable<Photo[]> {
        return this._http.get<Photo[]>(`${API}/${userName}/photos`);
    }

    listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
        const params = new HttpParams()
            .append('page', page.toString());
        return this._http.get<Photo[]>(`${API}/${userName}/photos`, { params });
    }

    upload(description: string, allowComments: boolean, file: File): Observable<Object> {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments? 'true' : 'false');
        formData.append('imageFile', file);
        return this._http.post(`${API}/photos/upload`, formData);
    }

    findById(id: number): Observable<Photo> {

        return this._http.get<Photo>(`${API}/photos/${id}`);
    }

    getComments(id: number): Observable<PhotoComment[]> {
        return this._http.get<PhotoComment[]>(`${API}/photos/${id}/comments`);
    }

    addComment(photoId: number, commentText: string): Observable<any>  {
        return this._http.post<PhotoComment>(`${API}/photos/${photoId}/comments`, {
            commentText
        });
    }
}