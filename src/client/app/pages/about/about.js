import tmplAbout from './about.ejs'

export default async () => {
    console.log('loadingAbout')
    const strAbout = tmplAbout();
    // console.log(strAbout);
    document.getElementById('app').replaceChildren();
    document.getElementById('app').innerHTML = strAbout;
}