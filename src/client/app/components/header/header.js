import tmplHeader from './header.ejs'

export default async () => {
    console.log('loadingheader')
    const strHeader = tmplHeader();
    // console.log(strHeader);
    document.getElementById('app').insertAdjacentHTML("beforebegin", strHeader);
}