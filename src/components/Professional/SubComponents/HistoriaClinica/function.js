export default function contadordeletras(string,flag=false){//cuenta hasta 30
    if(typeof(string)==="string"&&string.substring(0,30).includes(' ')&&string.length<=30) {
        flag=false
    } 
    if(typeof(string)==="string"&&string.length>30){
        flag=true;
        return contadordeletras(string.substring(30),flag);
    }
    return flag;   
}