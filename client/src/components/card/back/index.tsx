import { ReactComponent as SimpleRed } from './svg/simple_red.svg';
import { ReactComponent as SimpleBlack } from './svg/simple_black.svg';

const DEFAULT_BACK = 'simple_red';

const components: { [back: string ]: React.ComponentType} = {
    'simple_red': SimpleRed,
    'simple_black': SimpleBlack
};

export const renderComponent = (back: string = DEFAULT_BACK) => {
    back = back.toLowerCase();

    const Component = components[back];
    return <Component />;
};