import { Injectable } from '@angular/core';
import { Menu, MenuService } from './menu.service';
import { AuthService, User } from '@core/authentication';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissonsService: NgxPermissionsService,
    private rolesService: NgxRolesService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .change()
        .pipe(
          tap(user => this.setPermissions(user)),
          switchMap(() => this.authService.menu()),
          tap(menu => this.setMenu(menu))
        )
        .subscribe({
          next: () => resolve(),
          error: () => resolve(),
        });
    });
  }

  private setMenu(menu: Menu[]) {
    const permissionService = this.permissonsService;
    let userMenu = [] as Menu[];
    menu.forEach(function(item){
      if(item?.code){
      const checkPermission =  permissionService.getPermission(item.code);
      if(checkPermission){
        userMenu.push(item);
      }
    }});
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  private setPermissions(user: User) {
    if(user.permissions){
    const userRoles = user.roles as string[];
    // In a real app, you should get permissions and roles from the user information.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    const userPermission = user.permissions as string[];
    this.permissonsService.loadPermissions(userPermission);
    this.rolesService.flushRoles();
    const rolesService = this.rolesService;
    userRoles.forEach(function(item){
      rolesService.addRoles({ item: permissions });
      //rolesService.addRoles({ ADMIN: permissions });
    });



    // Tips: Alternatively you can add permissions with role at the same time.
    // this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
    }
   else{
    this.permissonsService.loadPermissions([]);
    this.rolesService.flushRoles();
   }
  }
}
