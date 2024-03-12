import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, catchError, finalize, map, tap, throwError } from "rxjs";
import { environment } from "src/environment/environment.develop";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        const baseUrl = environment.baseUrl;
        const newUrl = baseUrl + req.url;
        const request = req.clone({
            url: newUrl,
            setHeaders: {
                Authorization: "Bearer " + "Khaiajksdghukwegdfjaklgbfasdfhioa.ajshdwugfsjf.jasbdgqwuygasdaskjd"
            }
        });
        return next.handle(request).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    // Kiểm tra nếu response là instance của HttpResponse trước khi thay đổi
                    // const modifiedBody = {
                    //     data: [1, 2, 3, 4, 5]
                    // }
                    // return event.clone({ body: modifiedBody });
                    return event;
                }
                // Trả về event nguyên thủy nếu không phải là HttpResponse
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // Xử lý lỗi ở đây
                console.error('Interceptor error:', error);

                // Xử lý các loại lỗi cụ thể
                if (error.status === 400) {
                    // Xử lý lỗi 400
                    console.log('Bad request:', error.error);
                return throwError(() => new Error(error.error));
                } else if (error.status === 401) {
                    // Xử lý lỗi 401 (Unauthorized)
                    console.log('Unauthorized:', error.error);
                return throwError(() => new Error(error.error));
                } else if (error.status === 500) {
                    // Xử lý lỗi 500 (Internal Server Error)
                    console.log('Internal Server Error:', error.error);
                return throwError(() => new Error(error.error));
                }
                // Chuyển tiếp lỗi để có thể xử lý ở các interceptor hoặc service khác
                return throwError(() => new Error('Lỗi hệ thống, vui lòng liên hệ quản trị viên'));
            }),
            finalize(() => this.spinner.hide())
        );
    }
}
