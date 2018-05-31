import { DrawerActions, NavigationProp } from 'react-navigation'

class NavigationService {
  private navigator?: NavigationProp<any>

  setNav(ref: NavigationProp<any>) {
    this.navigator = ref
  }

  toggleDrawer() {
    if (!this.navigator) {
      throw new Error('Attempted to toggle drawer without navigator.')
    }

    this.navigator.dispatch(DrawerActions.toggleDrawer())
  }
}

const service = new NavigationService()

export default service
