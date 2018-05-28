import {DrawerActions, NavigationProp} from 'react-navigation';

class NavigationService {
  private navigator: NavigationProp<any>;

  setNav(ref: NavigationProp<any>) {
    this.navigator = ref;
  }

  toggleDrawer() {
    this.navigator.dispatch(DrawerActions.toggleDrawer());
  }
}

const service = new NavigationService();

export default service;
