import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	return next(req).pipe(
		catchError(err => {
			if (err instanceof HttpErrorResponse) {
				console.error('Server returned', err.status);
			}
			throw err; // rethrow
		}),
	);
}
