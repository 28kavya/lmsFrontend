import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const router = inject(Router);

  const expectedRole = route.data['role'];
  const userRole = localStorage.getItem('role');

  if (userRole === expectedRole) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
