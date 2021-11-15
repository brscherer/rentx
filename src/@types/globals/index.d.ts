import { AppRootParamList } from '../../routes/types'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}