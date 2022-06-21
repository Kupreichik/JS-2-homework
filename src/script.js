import './style.css';
import { GET_GOODS_ITEMS, BASKET_GOODS_ITEMS } from './constants';
import { serviceWithBody } from './service';
import './components/basketCard';
import './components/basketItem';
import './components/customButton';
import './components/errorMessage';
import './components/goodsItem';
import './components/searchInput';
import { init } from './appInit';

window.onload = init;