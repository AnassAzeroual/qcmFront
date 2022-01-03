import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';



export class CacheRouteReuseStrategy implements RouteReuseStrategy {
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  toUrlsAllowRetrieveCache = {'TestMasterComponent': true};
  fromUrlsAllowRetrieveCache = {'TestDetailsComponent': true};




  shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {

    let ret: boolean;

    const pathBefore = this.getPath(before);
    const pathCurr = this.getPath(curr);


    if (Object.keys(this.toUrlsAllowRetrieveCache).includes(pathCurr)) {
      if (  this.fromUrlsAllowRetrieveCache[pathBefore] ) {
        this.toUrlsAllowRetrieveCache[pathCurr] = true;
      } else {
        this.toUrlsAllowRetrieveCache[pathCurr] = false;
      }
    }



    ret = before.routeConfig === curr.routeConfig;

    // console.log('shouldReuseRoute -> this.allowRetriveCache[pathCurr] = ',  this.toUrlsAllowRetrieveCache[pathCurr], 'paths', pathBefore,  pathCurr, 'ret', ret);

    return ret;
  }



  shouldAttach(route: ActivatedRouteSnapshot): boolean {

    let ret: boolean;

    const path = this.getPath(route);

    // console.log('shouldAttach.shouldDetach', this.toUrlsAllowRetrieveCache);

    if (this.toUrlsAllowRetrieveCache[path]) {
      ret = this.storedRouteHandles.has(path);
    } else {
      ret = false;
    }


    // console.log('shouldAttach', path, 'ret', ret);

    return ret;
  }





  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {

    let ret: any;

    const path = this.getPath(route);
    ret = this.storedRouteHandles.get(path) as DetachedRouteHandle;

    // console.log('retrieve', path,  'retrieved',  (!!ret));

    return ret;
  }



  shouldDetach(route: ActivatedRouteSnapshot): boolean {

    let ret: boolean;

    const path = this.getPath(route);

    if (this.toUrlsAllowRetrieveCache.hasOwnProperty(path)) {
      ret = true;
    } else {
      ret = false;
    }

    // console.log('shouldDetach', path, 'ret', ret);

    return ret;
  }


  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {

    const path = this.getPath(route);
    this.storedRouteHandles.set(path, detachedTree);

    // console.log('store', path, 'stored', (!!detachedTree));
  }



  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig && route.routeConfig.component) {
        // console.log('getPath  route.routeConfig.component.name',  route.routeConfig.component.name);
      return route.routeConfig.component.name;
    }
    return '';
  }
}
