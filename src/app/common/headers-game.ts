import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
// contentHeaders.append('Accept', 'multipart/form-data');
contentHeaders.append('Content-Type', 'multipart/form-data');
contentHeaders.append('Authorization', localStorage.getItem('id_token'));
contentHeaders.append('enctype', 'multipart/form-data');







