import { configure } from 'enzyme'
// until enzyme releases official adapter for react 17...
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() })
