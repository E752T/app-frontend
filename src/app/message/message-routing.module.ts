import { ErrorHandler, inject } from '@angular/core';
import { Routes } from '@angular/router';

const routes: Routes = [
  //{ path: "object", component:  },
  {
    path: 'old-user-page',
    redirectTo: ({ queryParams }) => {
      const errorHandler = inject(ErrorHandler);
      const objectID = queryParams['objectID'];
      if (objectID !== undefined) {
        return `/object/${objectID}`;
      } else {
        errorHandler.handleError(
          new Error('Attempted navigation to page without a proprer ID.')
        );
        return `/not-found`;
      }
    },
  },
  //{ path: "object/:objectID", component: },
];
