import express from 'express';
import cors from 'cors';
import { writeFile, readFile } from 'fs/promises';

const BASKET_PATH = './public/basket_goods.json';
const GOODS_PATH = './public/goods.json';

const readBasket = () => {
  return readFile(BASKET_PATH, 'utf-8')
  .then((basketFile) => {
    return JSON.parse(basketFile)
  })
};

const readGoods = () => {
  return readFile(GOODS_PATH, 'utf-8')
  .then((goodsFile) => {
    return JSON.parse(goodsFile)
  })
};

function getReformBasket() {
  return Promise.all([
    readBasket(),
    readGoods()
  ]).then(([ basketList, goodsList ]) => {
    const result = basketList.map((basketItem) => {
      const goodsItem = goodsList.find(({ id: _goodsId}) => {
        return _goodsId === basketItem.id
      });
      return {
        ...basketItem,
        ...goodsItem
      }
    })
    return result
  })
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/goods', (res, req) => {
  readBasket().then((basketList) => {
    const basketItem = basketList.find(({id: _id}) => _id === res.body.id);
    if(!basketItem) {
      basketList.push({
        id: res.body.id,
        quantity: 1
      })
    } else {
      basketList = basketList.map((basketItem) => {
        if(basketItem.id === res.body.id) {
          return {
            ...basketItem,
            quantity: ++basketItem.quantity
          }
        } else {
          return basketItem
        }
      })
    };

    return writeFile(BASKET_PATH, JSON.stringify(basketList)).then(() => {
      return getReformBasket()
      .then((result) => req.send(result))
    })
  })
});

app.delete('/goods', (res, req) => {
  readBasket().then((basketList) => {
    const basketItem = basketList.find(({id: _id}) => _id === res.body.id);
    if(basketItem.quantity > 1) {
      basketList = basketList.map((basketItem) => {
        if(basketItem.id === res.body.id) {
          return {
            ...basketItem,
            quantity: --basketItem.quantity
          }
        } else {
          return basketItem
        }
      })
    } else {
      basketList = basketList.filter(
        basketItem => basketItem.id !== res.body.id)
    };

    return writeFile(BASKET_PATH, JSON.stringify(basketList)).then(() => {
      return getReformBasket()
      .then((result) => req.send(result))
    })
  })
});


app.get('/basket', (req, res) => {
  getReformBasket()
  .then(result => {
    res.send(JSON.stringify(result))
  })
});

app.listen('8000', () => {
  console.log('server is starting')
});