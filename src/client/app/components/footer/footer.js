import tmplFooter from './footer.ejs'

export default async () => {
    console.log('loadingFooter')
    const strFooter = tmplFooter();
    // console.log(strFooter);
    document.getElementById('app').insertAdjacentHTML("afterend", strFooter);
}