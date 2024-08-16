import tmplAdd from './add.ejs'

export default async () => {
    console.log('loadingAdd')
    const strAdd = tmplAdd();
    // console.log(strAdd);
    document.getElementById('app').replaceChildren();
    document.getElementById('app').innerHTML = strAdd;
}