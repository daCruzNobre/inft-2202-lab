import tmplFooter from './footer.ejs'

export default async () => {
    console.log('loadingFooter')
    const currentYear = new Date().getFullYear();
    const strFooter = tmplFooter({ currentYear });
    // console.log(strFooter);
    document.getElementById('app').insertAdjacentHTML("afterend", strFooter);
}