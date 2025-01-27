import Navigo from 'navigo';

// Import images so they are bundled
import 'bootstrap';
import './scss/styles.scss';
import './img/PedroPic.jpg'
import './img/bag-1455765_640.jpg'
import './img/Beige Brown Minimalist Professional Fashion Collection Facebook Cover.png'
import './img/Black Gold Minimalist Black Friday Sale Facebook Cover.png'
import "./img/Grey Black and White Bold Modern Men's Fashion Sale Facebook Cover.png"
import "./img/safety-120.png"
import "./img/variety-120.png"
import "./img/easy.png"
import "./img/art-1840481_640.jpg"
import "./img/bag-17953_1280.jpg"
import "./img/delivery-5585969_640.jpg"


import HeaderComponent from './app/components/header/header.js'
import FooterComponent from './app/components/footer/footer.js'
import HomePage from './app/pages/home/home.js'
import AboutPage from './app/pages/about/about.js'
import ListPage from './app/pages/list/list.js'
import ContactPage from './app/pages/contact/contact.js'
import AddPage from './app/pages/add/add.js'
import EditPage from './app/pages/add/edit.js'

console.log("Hello World!");

export const router = new Navigo('/');

window.addEventListener('load', () => {
    console.log(HeaderComponent)
    HeaderComponent();
    FooterComponent();

    router
        .on('/', HomePage)
        .on('/about', AboutPage)
        .on('/list', ListPage)
        .on('/contact', ContactPage)
        .on('/add', AddPage)
        .on('/edit', EditPage)
        .resolve();

    document.addEventListener('click', event => {
        // if there's a route attribute, do some internal routing
        if (event.target.attributes['route']){
            event.preventDefault();
            router.navigate(event.target.attributes['route'].value);
        }
    })    
})
