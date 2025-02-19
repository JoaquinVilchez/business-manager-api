import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorMessage = 'Database error';
    let statusCode = 400;

    switch (exception.code) {
      case 'P2002':
        errorMessage = 'Duplicate entry: A unique constraint failed.';
        break;
      case 'P2025':
        errorMessage = 'Resource not found.';
        statusCode = 404;
        break;
      case 'P2003':
        errorMessage = 'Foreign key constraint failed.';
        break;
      default:
        errorMessage = `Prisma error: ${exception.message}`;
    }

    response.status(statusCode).json({
      statusCode,
      message: errorMessage,
    });
  }
}
