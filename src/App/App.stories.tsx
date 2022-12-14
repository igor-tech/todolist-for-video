import App from './App';
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'App Base Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppBaseExample = () => {
    return <App demo={true}/>
}