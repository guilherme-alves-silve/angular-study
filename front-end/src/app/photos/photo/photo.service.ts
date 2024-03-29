import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { environment } from '../../../environments/environment'

const API = environment.apiUrl;

@Injectable({
    providedIn: 'root'
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
        return this._http.post(
            `${API}/photos/upload`, 
            formData,
            { 
                observe: 'events' ,
                reportProgress: true
            }
        );
    }

    findById(id: number): Observable<Photo> {

        return this._http.get<Photo>(`${API}/photos/${id}`);
    }

    getComments(photoId: number): Observable<PhotoComment[]> {
        return this._http.get<PhotoComment[]>(`${API}/photos/${photoId}/comments`);
    }

    addComment(photoId: number, commentText: string): Observable<any>  {
        return this._http.post<PhotoComment>(`${API}/photos/${photoId}/comments`, {
            commentText
        });
    }

    removePhoto(photoId: number): Observable<any> {
        return this._http.delete(`${API}/photos/${photoId}`)
    }

    like(photoId: number): Observable<any> {
        return this._http.post(`${API}/photos/${photoId}/like`, {}, { observe: 'response' })
        .pipe(map(res => true))
        .pipe(catchError(err => {
            return err.status == '304' 
                ? of(false) 
                : throwError(err);
        }));
    }
}
