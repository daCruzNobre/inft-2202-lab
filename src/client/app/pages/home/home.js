import tmplHome from './home.ejs'

export default async () => {
    console.log('loadingHome')
    const strHome = tmplHome();
    // console.log(strHome);
    document.getElementById('app').replaceChildren();
    document.getElementById('app').insertAdjacentHTML("afterbegin", strHome);
}