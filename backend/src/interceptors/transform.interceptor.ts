import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        const statusCode = context.getArgByIndex(1).statusCode;
        return next.handle().pipe(
            map((data) =>
                data.items && data.meta && data.links
                    ? {
                          statusCode,
                          data: data.items,
                          meta: data.meta,
                          links: data.links,
                      }
                    : { statusCode, data }
            )
        );
    }
}
