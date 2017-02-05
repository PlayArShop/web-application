import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
// contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('Authorization', localStorage.getItem('id_token'));
contentHeaders.append('Access-Control-Allow-Origin', '*');
contentHeaders.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');








